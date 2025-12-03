/**
 * Cloudflare Worker for Gateway Redirect Landing Page
 * 
 * This worker serves a static HTML page that displays information about
 * Cloudflare Gateway redirects, including special handling for AI content
 * categories with auto-redirect to Google Gemini.
 */

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cloudflare Gateway - Access Redirected</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: 
                linear-gradient(135deg, rgba(254, 215, 170, 0.95) 0%, rgba(234, 88, 12, 0.95) 100%),
                repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255, 255, 255, 0.03) 10px, rgba(255, 255, 255, 0.03) 20px),
                repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0, 0, 0, 0.02) 10px, rgba(0, 0, 0, 0.02) 20px);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            line-height: 1.6;
        }

        .container {
            background: white;
            border-radius: 16px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            max-width: 800px;
            width: 100%;
            overflow: hidden;
        }

        header {
            background: linear-gradient(135deg, #f38020 0%, #f6821f 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }

        .shield-icon {
            width: 60px;
            height: 60px;
            margin: 0 auto 15px;
        }

        header h1 {
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 8px;
        }

        header p {
            font-size: 16px;
            opacity: 0.95;
        }

        main {
            padding: 30px;
        }

        .alert {
            background: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 24px;
        }

        .alert.ai-mode {
            background: #fff7ed;
            border-left-color: #f38020;
        }

        .alert h2 {
            font-size: 18px;
            margin-bottom: 8px;
            color: #1f2937;
        }

        .alert p {
            color: #4b5563;
            font-size: 14px;
        }

        .redirect-button-container {
            margin-top: 20px;
        }

        .redirect-button {
            position: relative;
            width: 100%;
            padding: 16px;
            background: #f38020;
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            overflow: hidden;
            transition: background 0.3s;
        }

        .redirect-button:hover {
            background: #e56f0f;
        }

        .redirect-button .progress-bar {
            position: absolute;
            left: 0;
            top: 0;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            transition: width 0.05s linear;
            z-index: 1;
        }

        .redirect-button .button-text {
            position: relative;
            z-index: 2;
        }

        .noscript-link {
            display: block;
            margin-top: 16px;
            padding: 12px;
            background: #f3f4f6;
            border-radius: 8px;
            text-align: center;
        }

        .noscript-link a {
            color: #f38020;
            text-decoration: none;
            font-weight: 600;
        }

        section {
            margin-bottom: 24px;
        }

        section h3 {
            font-size: 18px;
            color: #1f2937;
            margin-bottom: 12px;
            padding-bottom: 8px;
            border-bottom: 2px solid #e5e7eb;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 12px;
            font-size: 14px;
        }

        table th {
            background: #f9fafb;
            padding: 12px;
            text-align: left;
            font-weight: 600;
            color: #374151;
            border-bottom: 2px solid #e5e7eb;
        }

        table td {
            padding: 12px;
            border-bottom: 1px solid #e5e7eb;
            color: #4b5563;
        }

        table tr:last-child td {
            border-bottom: none;
        }

        table td:first-child {
            font-weight: 600;
            color: #1f2937;
            width: 40%;
        }

        table td:last-child {
            word-break: break-all;
        }

        .empty-state {
            padding: 20px;
            text-align: center;
            color: #9ca3af;
            font-style: italic;
        }

        details {
            margin-top: 16px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            padding: 16px;
            background: #f9fafb;
        }

        summary {
            cursor: pointer;
            font-weight: 600;
            color: #374151;
            user-select: none;
        }

        summary:hover {
            color: #1f2937;
        }

        .additional-params {
            margin-top: 12px;
        }

        .param-item {
            padding: 8px 0;
            border-bottom: 1px solid #e5e7eb;
        }

        .param-item:last-child {
            border-bottom: none;
        }

        .param-key {
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 4px;
        }

        .param-value {
            color: #4b5563;
            word-break: break-all;
            font-family: 'Courier New', monospace;
            font-size: 13px;
        }

        footer {
            background: #f9fafb;
            padding: 20px 30px;
            text-align: center;
            color: #6b7280;
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
        }

        .error-message {
            background: #fee2e2;
            border: 1px solid #ef4444;
            color: #991b1b;
            padding: 16px;
            border-radius: 8px;
            margin-bottom: 24px;
        }

        @media (max-width: 640px) {
            body {
                padding: 10px;
            }

            header {
                padding: 20px;
            }

            header h1 {
                font-size: 24px;
            }

            main {
                padding: 20px;
            }

            table {
                font-size: 13px;
            }

            table th, table td {
                padding: 8px;
            }

            table td:first-child {
                width: 35%;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <svg class="shield-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L4 6V12C4 16.55 7.16 20.74 12 22C16.84 20.74 20 16.55 20 12V6L12 2Z" 
                      fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke="#667eea" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <h1>Access Redirected</h1>
            <p>Cloudflare Gateway Policy</p>
        </header>

        <main>
            <div id="app">
                <div class="error-message">
                    <strong>JavaScript Required</strong><br>
                    This page requires JavaScript to display redirect information.
                </div>
            </div>
        </main>

        <footer>
            <p>Protected by Cloudflare Gateway | <a href="https://www.cloudflare.com/zero-trust/" style="color: #3b82f6; text-decoration: none;">Learn More</a></p>
        </footer>
    </div>

    <noscript>
        <style>
            #app { display: none; }
        </style>
    </noscript>

    <script>
        (function() {
            'use strict';

            try {
                // Parse URL parameters
                const params = new URLSearchParams(window.location.search);
                
                // Known Cloudflare Gateway parameters
                const knownFields = {
                    cf_user_email: 'User Email',
                    cf_site_uri: 'Original URL',
                    cf_request_category_names: 'Content Categories',
                    cf_referer: 'Referer',
                    cf_rule_id: 'Rule ID',
                    cf_source_ip: 'Source IP',
                    cf_device_id: 'Device ID',
                    cf_application_names: 'Application Name',
                    cf_filter: 'Filter Type',
                    cf_account_id: 'Account ID',
                    cf_query_id: 'Query ID',
                    cf_connection_id: 'Connection ID',
                    cf_request_id: 'Request ID',
                    reason: 'Block Reason',
                    preferred_ai: 'Preferred AI Application'
                };

                // Extract known parameters
                const data = {};
                const additionalParams = {};
                
                for (const [key, value] of params.entries()) {
                    if (knownFields[key]) {
                        data[key] = decodeURIComponent(value);
                    } else {
                        additionalParams[key] = decodeURIComponent(value);
                    }
                }

                // Check for AI redirect mode
                const categories = data.cf_request_category_names || data.cf_request_categories || '';
                const categoryList = categories.split(',').map(c => c.trim().toLowerCase());
                const isAIMode = categoryList.includes('artificial intelligence');
                
                // Get custom parameters
                const customReason = data.reason || '';
                const preferredAI = data.preferred_ai || 'Google Gemini';
                // If preferred_ai is a URL, use it; otherwise default to Gemini
                const aiUrl = (data.preferred_ai && data.preferred_ai.startsWith('http')) 
                    ? data.preferred_ai 
                    : 'https://gemini.google.com/';

                // Build the UI
                const appDiv = document.getElementById('app');
                appDiv.innerHTML = '';

                // Create alert section
                const alert = document.createElement('div');
                alert.className = isAIMode ? 'alert ai-mode' : 'alert';

                if (isAIMode) {
                    const reasonText = customReason ? \`<p><strong>Reason:</strong> \${customReason}</p>\` : '';
                    
                    alert.innerHTML = \`
                        <h2>🤖 AI Service Blocked</h2>
                        <p>This AI service is not approved. Redirecting to \${preferredAI}...</p>
                        \${reasonText}
                    \`;

                    // Create continue button with progress bar
                    const redirectContainer = document.createElement('div');
                    redirectContainer.className = 'redirect-button-container';
                    
                    const redirectButton = document.createElement('button');
                    redirectButton.className = 'redirect-button';
                    redirectButton.innerHTML = \`
                        <div class="progress-bar" id="progressBar"></div>
                        <span class="button-text" id="buttonText">Continue to \${preferredAI}</span>
                    \`;
                    
                    redirectContainer.appendChild(redirectButton);
                    alert.appendChild(redirectContainer);
                    appDiv.appendChild(alert);

                    // Auto-redirect with 10-second countdown (after elements are in DOM)
                    const totalTime = 10000; // 10 seconds in milliseconds
                    const updateInterval = 50; // Update every 50ms for smooth animation
                    let elapsed = 0;
                    const progressBar = document.getElementById('progressBar');
                    const buttonText = document.getElementById('buttonText');

                    const updateProgress = () => {
                        const progress = (elapsed / totalTime) * 100;
                        progressBar.style.width = progress + '%';
                    };

                    const redirect = () => {
                        window.location.href = aiUrl;
                    };

                    // Manual redirect on button click
                    redirectButton.addEventListener('click', redirect);

                    // Smooth auto-redirect countdown
                    updateProgress();
                    const interval = setInterval(() => {
                        elapsed += updateInterval;
                        updateProgress();
                        
                        if (elapsed >= totalTime) {
                            clearInterval(interval);
                            redirect();
                        }
                    }, updateInterval);

                    // Noscript fallback
                    const noscriptDiv = document.createElement('noscript');
                    noscriptDiv.innerHTML = \`
                        <div class="noscript-link">
                            Continue to \${preferredAI}: <a href="\${aiUrl}">\${aiUrl}</a>
                        </div>
                    \`;
                    alert.appendChild(noscriptDiv);

                } else {
                    const siteUri = data.cf_site_uri || 'the requested site';
                    const displayCategories = data.cf_request_category_names || data.cf_request_categories || 'restricted content';
                    const ruleId = data.cf_rule_id || 'your organization\\'s policy';
                    
                    alert.innerHTML = \`
                        <h2>⚠️ Access Blocked</h2>
                        <p>You were redirected because <strong>\${siteUri}</strong> is categorized as <strong>\${displayCategories}</strong> and is blocked by your organization's Cloudflare Gateway policy\${data.cf_rule_id ? \` (Rule: \${ruleId})\` : ''}</p>
                    \`;
                    appDiv.appendChild(alert);
                }

                // Technical Details section (collapsed by default)
                const detailsSection = document.createElement('section');
                
                const technicalDetails = document.createElement('details');
                const technicalSummary = document.createElement('summary');
                technicalSummary.textContent = '📋 Technical Details';
                technicalDetails.appendChild(technicalSummary);
                
                const table = document.createElement('table');
                const tbody = document.createElement('tbody');

                let hasData = false;
                for (const [key, label] of Object.entries(knownFields)) {
                    const row = document.createElement('tr');
                    const keyCell = document.createElement('td');
                    const valueCell = document.createElement('td');
                    
                    keyCell.textContent = label;
                    valueCell.textContent = data[key] || 'Not provided';
                    
                    row.appendChild(keyCell);
                    row.appendChild(valueCell);
                    tbody.appendChild(row);
                    
                    if (data[key]) hasData = true;
                }

                if (hasData) {
                    table.appendChild(tbody);
                    technicalDetails.appendChild(table);
                } else {
                    const emptyState = document.createElement('div');
                    emptyState.className = 'empty-state';
                    emptyState.textContent = 'No technical details available';
                    technicalDetails.appendChild(emptyState);
                }

                detailsSection.appendChild(technicalDetails);
                appDiv.appendChild(detailsSection);

                // Additional Parameters section
                if (Object.keys(additionalParams).length > 0) {
                    const additionalSection = document.createElement('section');
                    additionalSection.innerHTML = '<h3>🔍 Additional Parameters</h3>';
                    
                    const details = document.createElement('details');
                    const summary = document.createElement('summary');
                    summary.textContent = \`Show \${Object.keys(additionalParams).length} additional parameter\${Object.keys(additionalParams).length !== 1 ? 's' : ''}\`;
                    details.appendChild(summary);

                    const paramsDiv = document.createElement('div');
                    paramsDiv.className = 'additional-params';

                    for (const [key, value] of Object.entries(additionalParams)) {
                        const paramItem = document.createElement('div');
                        paramItem.className = 'param-item';
                        paramItem.innerHTML = \`
                            <div class="param-key">\${key}</div>
                            <div class="param-value">\${value}</div>
                        \`;
                        paramsDiv.appendChild(paramItem);
                    }

                    details.appendChild(paramsDiv);
                    additionalSection.appendChild(details);
                    appDiv.appendChild(additionalSection);
                }

            } catch (error) {
                console.error('Error initializing page:', error);
                document.getElementById('app').innerHTML = \`
                    <div class="error-message">
                        <strong>Error Loading Page</strong><br>
                        \${error.message}
                    </div>
                \`;
            }
        })();
    </script>
</body>
</html>`;

export default {
  async fetch(request, env, ctx) {
    return new Response(htmlContent, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
};
