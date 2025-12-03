# Testing Guide

## Base URLs

**Production:** `https://your-worker-name.your-subdomain.workers.dev`  
**Local Dev:** `http://localhost:8787`

---

## Quick Test URLs

### 1. Default AI Redirect (Gemini)
```
?cf_request_category_names=Artificial%20Intelligence
```
**Expected:** Redirects to Google Gemini after 10 seconds

### 2. Claude AI
```
?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://claude.ai/
```
**Expected:** Redirects to Claude

### 3. Microsoft Copilot
```
?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://copilot.microsoft.com/
```
**Expected:** Redirects to Copilot

### 4. With Custom Reason
```
?cf_request_category_names=Artificial%20Intelligence&reason=Use%20approved%20AI%20tools%20only
```
**Expected:** Shows custom reason message

### 5. Generic Block (Non-AI)
```
?cf_request_category_names=Social%20Media&cf_site_uri=facebook.com
```
**Expected:** Yellow alert, no redirect

---

## Full Test URLs (Production)

Replace `your-worker-name.your-subdomain.workers.dev` with your actual worker URL.

### Default Gemini
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence
```

### Claude with Reason
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://claude.ai/&reason=ChatGPT%20blocked%20-%20use%20Claude
```

### Complete Example
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&cf_site_uri=chatgpt.com&cf_user_email=user@company.com&cf_rule_id=ai-001&preferred_ai=https://claude.ai/&reason=Use%20approved%20AI%20tool
```

---

## Parameter Reference

| Parameter | Required | Type | Description |
|-----------|----------|------|-------------|
| `cf_request_category_names` | Yes* | String | Content categories (must include "Artificial Intelligence" for AI mode) |
| `preferred_ai` | No | URL | Preferred AI application URL (default: Gemini) |
| `reason` | No | String | Custom block reason message |
| `cf_site_uri` | No | String | Original blocked URL |
| `cf_user_email` | No | String | User's email address |
| `cf_rule_id` | No | String | Gateway rule ID |
| `cf_application_names` | No | String | Application name |
| `cf_source_ip` | No | String | Source IP address |
| `cf_device_id` | No | String | Device identifier |

\* Or use legacy `cf_request_categories` parameter

---

## Testing Checklist

- [ ] Default Gemini redirect works
- [ ] Custom AI redirects work (Claude, Copilot, ChatGPT)
- [ ] Custom reason displays correctly
- [ ] Progress bar animates smoothly (10 seconds)
- [ ] Manual button click works immediately
- [ ] Technical details section is collapsible
- [ ] Generic block (non-AI) shows correctly
- [ ] Mobile responsive design works
- [ ] All parameters display in technical details

---

## URL Encoding Reference

| Character | Encoded | Example |
|-----------|---------|---------|
| Space | `%20` | `Use Claude` → `Use%20Claude` |
| Colon | `%3A` | `https://` → `https%3A//` |
| Slash | `%2F` | `/chat` → `%2Fchat` |
| Comma | `%2C` | `AI,Cloud` → `AI%2CCloud` |

---

## Troubleshooting

**Redirect not working?**
- Verify `preferred_ai` starts with `http://` or `https://`
- Check URL encoding is correct
- Check browser console for errors

**Progress bar not smooth?**
- Ensure JavaScript is enabled
- Try a different browser
- Check for console errors

**Button not showing?**
- Verify `cf_request_category_names` includes "Artificial Intelligence"
- Check parameter is properly encoded
- Ensure page loaded without errors
