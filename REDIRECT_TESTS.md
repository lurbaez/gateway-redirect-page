# Custom Redirect Test URLs

## Base URL

Replace with your actual worker URL:
```
https://your-worker-name.your-subdomain.workers.dev
```

---

## 1. Default Redirect (Google Gemini)

### No preferred_ai parameter
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence
```
**Expected:**
- Button: "Continue to Google Gemini"
- Redirects to: `https://gemini.google.com/`

---

## 2. Google Gemini (Explicit)

### With explicit Gemini URL
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://gemini.google.com/
```
**Expected:**
- Button: "Continue to https://gemini.google.com/"
- Redirects to: `https://gemini.google.com/`

---

## 3. Claude AI (Anthropic)

### Claude redirect
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://claude.ai/
```
**Expected:**
- Button: "Continue to https://claude.ai/"
- Redirects to: `https://claude.ai/`

### Claude with new chat
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://claude.ai/new
```
**Expected:**
- Button: "Continue to https://claude.ai/new"
- Redirects to: `https://claude.ai/new`

---

## 4. Microsoft Copilot

### Copilot redirect
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://copilot.microsoft.com/
```
**Expected:**
- Button: "Continue to https://copilot.microsoft.com/"
- Redirects to: `https://copilot.microsoft.com/`

---

## 5. Perplexity AI

### Perplexity redirect
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://www.perplexity.ai/
```
**Expected:**
- Button: "Continue to https://www.perplexity.ai/"
- Redirects to: `https://www.perplexity.ai/`

---

## 6. OpenAI ChatGPT

### ChatGPT redirect
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://chat.openai.com/
```
**Expected:**
- Button: "Continue to https://chat.openai.com/"
- Redirects to: `https://chat.openai.com/`

### ChatGPT with specific model
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://chat.openai.com/?model=gpt-4
```
**Expected:**
- Button: "Continue to https://chat.openai.com/?model=gpt-4"
- Redirects to: `https://chat.openai.com/?model=gpt-4`

---

## 7. Hugging Face Chat

### Hugging Face redirect
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://huggingface.co/chat/
```
**Expected:**
- Button: "Continue to https://huggingface.co/chat/"
- Redirects to: `https://huggingface.co/chat/`

---

## 8. Poe (Quora)

### Poe redirect
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://poe.com/
```
**Expected:**
- Button: "Continue to https://poe.com/"
- Redirects to: `https://poe.com/`

---

## 9. You.com AI

### You.com redirect
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://you.com/
```
**Expected:**
- Button: "Continue to https://you.com/"
- Redirects to: `https://you.com/`

---

## 10. Custom Internal AI Tool

### Internal company AI
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://ai.company.com/chat
```
**Expected:**
- Button: "Continue to https://ai.company.com/chat"
- Redirects to: `https://ai.company.com/chat`

### Internal AI with subdomain
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://internal-ai.corp.example.com/
```
**Expected:**
- Button: "Continue to https://internal-ai.corp.example.com/"
- Redirects to: `https://internal-ai.corp.example.com/`

---

## 11. With Custom Reason

### Claude with reason
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://claude.ai/&reason=ChatGPT%20is%20blocked%20-%20use%20Claude%20instead
```
**Expected:**
- Shows reason: "**Reason:** ChatGPT is blocked - use Claude instead"
- Button: "Continue to https://claude.ai/"
- Redirects to: `https://claude.ai/`

### Copilot with policy reason
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://copilot.microsoft.com/&reason=Only%20Microsoft%20Copilot%20is%20approved%20per%20IT%20policy
```
**Expected:**
- Shows reason: "**Reason:** Only Microsoft Copilot is approved per IT policy"
- Button: "Continue to https://copilot.microsoft.com/"
- Redirects to: `https://copilot.microsoft.com/`

---

## 12. Full Gateway Integration Examples

### Complete example with all parameters
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&cf_site_uri=chatgpt.com&cf_user_email=john.doe@company.com&cf_rule_id=ai-block-001&cf_application_names=ChatGPT&preferred_ai=https://claude.ai/&reason=Use%20approved%20AI%20tool
```
**Expected:**
- Shows reason
- All Gateway parameters in Technical Details
- Redirects to Claude

### Enterprise deployment example
```
https://your-worker-name.your-subdomain.workers.dev/?cf_request_category_names=Artificial%20Intelligence&cf_site_uri=chat.openai.com&cf_user_email=employee@enterprise.com&cf_rule_id=enterprise-ai-policy&cf_source_ip=10.0.1.100&cf_device_id=LAPTOP-ABC123&preferred_ai=https://copilot.microsoft.com/&reason=Enterprise%20license%20required%20-%20use%20Copilot
```
**Expected:**
- Full technical details
- Enterprise reason displayed
- Redirects to Copilot

---

## Quick Copy-Paste List

### Popular AI Services

**Google Gemini (Default):**
```
?cf_request_category_names=Artificial%20Intelligence
```

**Claude:**
```
?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://claude.ai/
```

**Microsoft Copilot:**
```
?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://copilot.microsoft.com/
```

**ChatGPT:**
```
?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://chat.openai.com/
```

**Perplexity:**
```
?cf_request_category_names=Artificial%20Intelligence&preferred_ai=https://www.perplexity.ai/
```

---

## Testing Checklist

- [ ] Default redirect to Gemini works
- [ ] Claude redirect works
- [ ] Copilot redirect works
- [ ] ChatGPT redirect works
- [ ] Perplexity redirect works
- [ ] Custom internal URL works
- [ ] Reason parameter displays correctly
- [ ] Progress bar animates smoothly (10 seconds)
- [ ] Manual button click works immediately
- [ ] Technical details section shows all parameters
- [ ] Mobile responsive design works
- [ ] All URLs redirect correctly after 10 seconds

---

## Notes

1. **URL Encoding**: Spaces must be encoded as `%20`, colons as `%3A`, etc.
2. **HTTPS Required**: The `preferred_ai` parameter must start with `http://` or `https://`
3. **Fallback**: If `preferred_ai` is not a valid URL, it defaults to Gemini
4. **Case Insensitive**: "Artificial Intelligence" matching is case-insensitive
5. **Progress Bar**: Always takes exactly 10 seconds before auto-redirect
6. **Manual Override**: Clicking the button redirects immediately

---

## Common AI Service URLs

| Service | URL |
|---------|-----|
| Google Gemini | `https://gemini.google.com/` |
| Claude (Anthropic) | `https://claude.ai/` |
| Microsoft Copilot | `https://copilot.microsoft.com/` |
| ChatGPT (OpenAI) | `https://chat.openai.com/` |
| Perplexity AI | `https://www.perplexity.ai/` |
| Hugging Face Chat | `https://huggingface.co/chat/` |
| Poe (Quora) | `https://poe.com/` |
| You.com | `https://you.com/` |
| Bing Chat | `https://www.bing.com/chat` |
| Character.AI | `https://character.ai/` |

---

## Troubleshooting

**Redirect not working?**
- Check that `preferred_ai` starts with `http://` or `https://`
- Verify the URL is properly encoded
- Check browser console for errors

**Progress bar not smooth?**
- Ensure JavaScript is enabled
- Check for browser console errors
- Try a different browser

**Button not showing?**
- Verify `cf_request_category_names` includes "Artificial Intelligence"
- Check that the parameter is properly encoded
- Ensure the page loaded without errors
