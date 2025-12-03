# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-11-27

### Added
- Initial release of Cloudflare Gateway Redirect Landing Page
- Smart AI content detection
- Custom redirect support for any AI application
- 10-second smooth progress bar with auto-redirect
- Custom reason parameter for organization-specific messages
- Collapsible technical details sections
- Modern Cloudflare-branded orange gradient design with texture
- Mobile-responsive layout
- Support for all Cloudflare Gateway parameters
- Zero external dependencies

### Features
- **AI Detection**: Automatically detects "Artificial Intelligence" in content categories
- **Custom Redirects**: `preferred_ai` parameter for any AI service URL
- **Custom Reasons**: `reason` parameter for block messages
- **Progress Bar**: Smooth 10-second countdown with 50ms updates
- **Manual Override**: Click button to skip countdown
- **Fallback Support**: Works without JavaScript (noscript)

### Parameters
- `cf_request_category_names` - Content categories (triggers AI mode)
- `cf_application_names` - Application name
- `preferred_ai` - Custom AI redirect URL (default: Gemini)
- `reason` - Custom block reason message
- All standard Cloudflare Gateway parameters supported

### Design
- Cloudflare orange gradient background (#fed7aa → #ea580c)
- Subtle crosshatch texture pattern
- Collapsible technical details
- Clean, modern UI with smooth animations

---

## Future Enhancements

- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Analytics integration
- [ ] Custom branding options
- [ ] Email notification option
- [ ] Configurable countdown duration via parameter
