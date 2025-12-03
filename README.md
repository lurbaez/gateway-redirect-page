# 🛡️ Cloudflare Gateway Redirect Landing Page

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/adz80/cloudflare-gateway-redirect-landing-page)

A professional landing page for Cloudflare Gateway redirects with intelligent AI content detection and automatic redirect to approved AI applications.

## ✨ Features

- 🤖 **Smart AI Detection** - Automatically detects AI content categories
- 🔄 **Custom Redirects** - Configure any approved AI app (Gemini, Claude, Copilot, etc.)
- ⏱️ **Smooth Progress Bar** - 10-second animated countdown with manual override
- 📝 **Custom Reasons** - Display organization-specific block messages
- 📊 **Collapsible Details** - Clean UI with expandable technical information
- 🎨 **Modern Design** - Cloudflare-branded orange gradient with texture
- 📱 **Responsive** - Works perfectly on all devices
- ⚡ **Zero Dependencies** - Self-contained with inline CSS/JS

## 🚀 Quick Start

### 1. Clone and Install
```bash
git clone https://github.com/adz80/cloudflare-gateway-redirect-landing-page.git
cd cloudflare-gateway-redirect-landing-page
npm install
```

### 2. Authenticate with Cloudflare
```bash
npx wrangler login
```

### 3. Develop Locally
```bash
npm run dev
# Opens at http://localhost:8787
```

### 4. Deploy to Cloudflare
```bash
npm run deploy
```

Your worker will be live at: `https://gateway-redirect-page.YOUR_SUBDOMAIN.workers.dev`

## 📖 Documentation

- **[TESTING.md](TESTING.md)** - Testing guide with example URLs and parameters
- **[REDIRECT_TESTS.md](REDIRECT_TESTS.md)** - Complete list of custom redirect test URLs

## 🔧 Custom Parameters

### `preferred_ai` (Optional)
Set the preferred AI application URL for redirects.

**Default:** `https://gemini.google.com/`

**Examples:**
```
?preferred_ai=https://claude.ai/
?preferred_ai=https://copilot.microsoft.com/
?preferred_ai=https://chat.openai.com/
```

### `reason` (Optional)
Display a custom block reason message.

**Example:**
```
?reason=This%20AI%20service%20is%20not%20approved
```

### Combined Example
```
https://your-worker.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://claude.ai/&reason=Use%20approved%20AI%20tool
```

## 🧪 Test URLs

### Default (Gemini)
```
https://your-worker.workers.dev/?cf_request_category_names=Artificial%20Intelligence
```

### Claude AI
```
https://your-worker.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://claude.ai/
```

### Microsoft Copilot
```
https://your-worker.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://copilot.microsoft.com/
```

### With Custom Reason
```
https://your-worker.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://claude.ai/&reason=Use%20approved%20AI%20tool
```

## 📂 Project Structure

```
/
├── worker.js              # Cloudflare Worker (deployed file)
├── wrangler.toml          # Wrangler configuration
├── package.json           # Project dependencies
├── index.html             # Standalone version for local testing
├── TESTING.md             # Testing guide
├── REDIRECT_TESTS.md      # Redirect test URLs
└── README.md              # This file
```

## 🔗 Cloudflare Gateway Integration

### Configure Gateway Policy

1. Go to **Cloudflare Zero Trust Dashboard**
2. Navigate to **Gateway** → **Firewall Policies**
3. Create or edit a policy
4. Under **Action**, select **Block**
5. Enable **Display custom block page**
6. Enter your worker URL:
   ```
   https://gateway-redirect-page.YOUR_SUBDOMAIN.workers.dev
   ```

### Supported Parameters

The page automatically parses these Cloudflare Gateway parameters:

| Parameter | Description |
|-----------|-------------|
| `cf_request_category_names` | Content categories (triggers AI mode if includes "Artificial Intelligence") |
| `cf_application_names` | Application name |
| `cf_user_email` | User's email address |
| `cf_site_uri` | Original blocked URL |
| `cf_rule_id` | Gateway rule ID |
| `cf_source_ip` | Source IP address |
| `cf_device_id` | Device identifier |
| `reason` | Custom block reason (custom parameter) |
| `preferred_ai` | Preferred AI redirect URL (custom parameter) |

## 🎨 Customization

### Change Colors
Edit the gradient in `worker.js`:
```css
background: linear-gradient(135deg, rgba(254, 215, 170, 0.95) 0%, rgba(234, 88, 12, 0.95) 100%);
```

### Adjust Countdown
Change the timer duration (default is 10 seconds):
```javascript
const totalTime = 10000; // milliseconds
```

### Modify AI Detection
Update the category check:
```javascript
const isAIMode = categoryList.includes('artificial intelligence');
```

## 🔒 Security

- ✅ No external dependencies
- ✅ No data storage or transmission
- ✅ Client-side processing only
- ✅ HTTPS via Cloudflare Workers
- ✅ CSP compatible

## 🌐 Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers

## 📝 License

MIT License - Feel free to modify and customize for your organization's needs.

## 🤝 Contributing

Contributions welcome! Please open an issue or pull request.

## 📞 Support

- **Landing Page Issues**: Open an issue in this repository
- **Cloudflare Gateway**: [Cloudflare Support](https://support.cloudflare.com/)
- **Cloudflare Workers**: [Workers Documentation](https://developers.cloudflare.com/workers/)

---

**Made with ❤️ for Cloudflare Gateway users**
