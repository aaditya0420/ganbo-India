const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000;
const hits = new Map();

const LIMITS = {
  name: 120,
  email: 254,
  mobile: 30,
  purchaseDate: 32,
  productName: 200,
  serialNumber: 80,
};

function setCors(req, res) {
  const origin = req.headers.origin || "";
  if (isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function isAllowedOrigin(origin) {
  if (!origin) return true;
  try {
    const { hostname } = new URL(origin);
    return (
      hostname === "localhost" ||
      hostname === "ganbo.co.in" ||
      hostname === "www.ganbo.co.in" ||
      hostname.endsWith(".vercel.app")
    );
  } catch {
    return false;
  }
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) {
    return forwarded.split(",")[0].trim();
  }
  return req.headers["x-real-ip"] || req.socket?.remoteAddress || "unknown";
}

function allowRequest(ip) {
  const now = Date.now();
  const record = hits.get(ip);
  if (!record || now > record.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (record.count >= RATE_LIMIT) return false;
  record.count += 1;
  return true;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clip(value, max) {
  return String(value ?? "").trim().slice(0, max);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function emailDomain(value) {
  const match = String(value || "").match(/@([^>\s]+)/);
  return (match?.[1] || "").toLowerCase();
}

function resolveFromEmail() {
  const configured = process.env.WARRANTY_FROM_EMAIL || "";
  const domain = emailDomain(configured);
  if (domain && domain !== "gmail.com" && domain !== "googlemail.com") {
    return configured;
  }
  return "GANBO Warranty <support@ganbo.co.in>";
}

function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return {};
}

function buildClaimEmail({
  name,
  email,
  mobile,
  purchaseDate,
  productName,
  serialNumber,
}) {
  const rows = [
    ["Name", name || "—"],
    ["Email", email],
    ["Mobile", mobile || "—"],
    ["Purchase date", purchaseDate || "—"],
    ["Product", productName],
    ["Serial number", serialNumber],
  ]
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #e8ecf4;width:38%;font-size:13px;color:#64748b;font-weight:600;letter-spacing:.04em;text-transform:uppercase;">${escapeHtml(label)}</td>
          <td style="padding:12px 0;border-bottom:1px solid #e8ecf4;font-size:15px;color:#141b2b;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8ecf4;">
            <tr>
              <td style="background:#141b2b;padding:28px 32px;">
                <p style="margin:0 0 6px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#93c5fd;font-weight:700;">GANBO Support</p>
                <h1 style="margin:0;font-size:22px;line-height:1.3;color:#ffffff;">New warranty claim</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 8px;">
                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#475569;">
                  A customer submitted a warranty claim from ganbo.co.in. Reply to this email to contact them directly.
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rows}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:8px 32px 28px;">
                <p style="margin:20px 0 0;font-size:12px;line-height:1.6;color:#94a3b8;">
                  Submitted ${escapeHtml(
                    new Date().toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      dateStyle: "medium",
                      timeStyle: "short",
                    }),
                  )} IST · GANBO India
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    "New GANBO warranty claim",
    "",
    `Name: ${name || "—"}`,
    `Email: ${email}`,
    `Mobile: ${mobile || "—"}`,
    `Purchase date: ${purchaseDate || "—"}`,
    `Product: ${productName}`,
    `Serial number: ${serialNumber}`,
  ].join("\n");

  return { html, text };
}

function buildCustomerEmail({ name, productName, serialNumber }) {
  const greeting = name ? `Hi ${escapeHtml(name)},` : "Hi,";
  const html = `<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background:#f4f6fb;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e8ecf4;">
            <tr>
              <td style="background:#141b2b;padding:28px 32px;">
                <p style="margin:0 0 6px;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#93c5fd;font-weight:700;">GANBO Support</p>
                <h1 style="margin:0;font-size:22px;line-height:1.3;color:#ffffff;">We received your warranty claim</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;">
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#475569;">${greeting}</p>
                <p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#475569;">
                  Thank you for contacting GANBO. Your warranty claim has been received and our support team will review it shortly.
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:12px;padding:8px 16px;">
                  <tr>
                    <td style="padding:12px 0;font-size:13px;color:#64748b;">Product</td>
                    <td style="padding:12px 0;font-size:15px;color:#141b2b;font-weight:600;">${escapeHtml(productName)}</td>
                  </tr>
                  <tr>
                    <td style="padding:12px 0;font-size:13px;color:#64748b;">Serial number</td>
                    <td style="padding:12px 0;font-size:15px;color:#141b2b;font-weight:600;">${escapeHtml(serialNumber)}</td>
                  </tr>
                </table>
                <p style="margin:20px 0 0;font-size:15px;line-height:1.6;color:#475569;">
                  We typically respond within 24–48 hours. You do not need to send this claim again.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 32px 28px;">
                <p style="margin:0;font-size:12px;line-height:1.6;color:#94a3b8;">GANBO India · ganbo.co.in</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    greeting.replace(/<[^>]+>/g, ""),
    "",
    "Thank you for contacting GANBO. Your warranty claim has been received.",
    `Product: ${productName}`,
    `Serial number: ${serialNumber}`,
    "",
    "We typically respond within 24–48 hours.",
  ].join("\n");

  return { html, text };
}

async function sendResendEmail(apiKey, payload) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const details = await response.text();
  let message = "";
  try {
    message = JSON.parse(details)?.message || details;
  } catch {
    message = details;
  }
  return { ok: response.ok, status: response.status, message };
}

async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return { ok: false, reason: "missing-secret" };

  const body = new URLSearchParams({
    secret,
    response: token,
  });
  if (ip && ip !== "unknown") body.set("remoteip", ip);

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    },
  );
  const data = await response.json();
  return { ok: Boolean(data.success), reason: data["error-codes"]?.[0] };
}

export default async function handler(req, res) {
  setCors(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const origin = req.headers.origin || "";
  if (origin && !isAllowedOrigin(origin)) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const ip = clientIp(req);
  if (!allowRequest(ip)) {
    return res.status(429).json({
      error: "Too many claims from this connection. Please try again later.",
    });
  }

  const payload = readBody(req);

  if (clip(payload.website, 80)) {
    return res.status(200).json({ ok: true });
  }

  const name = clip(payload.name, LIMITS.name);
  const email = clip(payload.email, LIMITS.email).toLowerCase();
  const mobile = clip(payload.mobile, LIMITS.mobile);
  const purchaseDate = clip(payload.purchaseDate, LIMITS.purchaseDate);
  const productName = clip(payload.productName, LIMITS.productName);
  const serialNumber = clip(payload.serialNumber, LIMITS.serialNumber);
  const consent = payload.consent === true || payload.consent === "true";
  const turnstileToken = clip(payload.turnstileToken, 2048);

  if (!consent) {
    return res.status(400).json({ error: "Consent is required." });
  }
  if (!email || !isEmail(email)) {
    return res.status(400).json({ error: "A valid email is required." });
  }
  if (!productName) {
    return res.status(400).json({ error: "Product name is required." });
  }
  if (!serialNumber) {
    return res.status(400).json({ error: "Serial number is required." });
  }
  if (!turnstileToken) {
    return res.status(400).json({ error: "Please complete the verification." });
  }

  const captcha = await verifyTurnstile(turnstileToken, ip);
  if (!captcha.ok) {
    return res.status(403).json({
      error: "Verification failed. Please refresh and try again.",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.WARRANTY_TO_EMAIL;
  const fromEmail = resolveFromEmail();

  if (!apiKey || !toEmail) {
    return res.status(503).json({
      error: "Email service is not configured yet.",
    });
  }

  const ownerEmail = buildClaimEmail({
    name,
    email,
    mobile,
    purchaseDate,
    productName,
    serialNumber,
  });

  const ownerSend = await sendResendEmail(apiKey, {
    from: fromEmail,
    to: [toEmail],
    reply_to: email,
    subject: `Warranty claim — ${productName} — ${serialNumber}`,
    html: ownerEmail.html,
    text: ownerEmail.text,
  });

  if (!ownerSend.ok) {
    console.error("Resend owner email error", ownerSend.status, ownerSend.message);
    return res.status(502).json({
      error:
        ownerSend.message || "Could not send the claim email. Please try again.",
    });
  }

  if (email !== toEmail.toLowerCase()) {
    const customerEmail = buildCustomerEmail({
      name,
      productName,
      serialNumber,
    });
    const customerSend = await sendResendEmail(apiKey, {
      from: fromEmail,
      to: [email],
      reply_to: toEmail,
      subject: "We received your GANBO warranty claim",
      html: customerEmail.html,
      text: customerEmail.text,
    });
    if (!customerSend.ok) {
      console.error(
        "Resend customer email error",
        customerSend.status,
        customerSend.message,
      );
    }
  }

  return res.status(200).json({ ok: true });
}
