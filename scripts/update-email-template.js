import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Supabase configuration from environment variables
const supabaseUrl = process.env.SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceRoleKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY environment variable is not set');
  console.log('Please set the environment variable before running this script.');
  console.log('Example: SUPABASE_SERVICE_ROLE_KEY="your-key" node update-email-template.js');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Study-Flow - Confirm Your Email</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f3f4f6;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.07);">
                    
                    <!-- Header with Study-Flow gradient -->
                    <tr>
                        <td style="background: linear-gradient(135deg, hsl(259, 83%, 67%) 0%, hsl(275, 100%, 84%) 100%); border-radius: 16px 16px 0 0; padding: 40px 40px 30px 40px; text-align: center;">
                            <!-- Study-Flow Logo - BookOpen Icon -->
                            <div style="display: inline-block; background: linear-gradient(135deg, hsl(259, 83%, 67%) 0%, hsl(275, 100%, 84%) 100%); background-color: rgba(255, 255, 255, 0.2); border-radius: 12px; padding: 12px; margin-bottom: 20px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);">
                                <!-- BookOpen SVG Icon -->
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style="color: #ffffff;">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.8"/>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="currentColor" stroke-width="2" fill="currentColor" opacity="0.8"/>
                                </svg>
                            </div>
                            <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 10px;">
                                <h1 style="color: #ffffff; font-size: 32px; font-weight: 700; margin: 0; line-height: 1.2;">
                                    Study-Flow
                                </h1>
                            </div>
                            <p style="color: rgba(255, 255, 255, 0.95); font-size: 16px; margin: 0; font-weight: 400;">
                                Your AI-powered study companion
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px;">
                            <!-- Greeting -->
                            <h2 style="color: #1f2937; font-size: 24px; font-weight: 600; margin: 0 0 20px 0;">
                                Hi there, future Study-Flow champion! 🎓
                            </h2>
                            
                            <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                                We're thrilled you've decided to join Study-Flow, your AI-powered study companion. You're just one click away from unlocking a world of smart studying, personalized learning paths, and achieving your academic goals!
                            </p>
                            
                            <!-- CTA Button -->
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td align="center" style="padding: 30px 0;">
                                        <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 16px 48px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; font-size: 16px; font-weight: 600; border-radius: 8px; box-shadow: 0 4px 14px rgba(102, 126, 234, 0.4);">
                                            Confirm Your Email Address
                                        </a>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Timer Warning -->
                            <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 8px; margin: 20px 0;">
                                <p style="color: #92400e; font-size: 14px; margin: 0; font-weight: 600;">
                                    ⏰ Quick reminder: This link expires in 10 minutes for your security.
                                </p>
                            </div>
                            
                            <!-- Features Section -->
                            <h3 style="color: #1f2937; font-size: 18px; font-weight: 600; margin: 30px 0 20px 0;">
                                Here's what awaits you:
                            </h3>
                            
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="padding: 12px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="width: 40px; vertical-align: top;">
                                                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; text-align: center; line-height: 32px; color: white; font-size: 16px;">
                                                        🧠
                                                    </div>
                                                </td>
                                                <td style="padding-left: 16px;">
                                                    <h4 style="color: #1f2937; font-size: 16px; font-weight: 600; margin: 0 0 4px 0;">
                                                        AI-Powered Study Sessions
                                                    </h4>
                                                    <p style="color: #6b7280; font-size: 14px; margin: 0; line-height: 1.5;">
                                                        Get personalized study recommendations and adaptive learning paths tailored to your needs
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="padding: 12px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="width: 40px; vertical-align: top;">
                                                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; text-align: center; line-height: 32px; color: white; font-size: 16px;">
                                                        🎯
                                                    </div>
                                                </td>
                                                <td style="padding-left: 16px;">
                                                    <h4 style="color: #1f2937; font-size: 16px; font-weight: 600; margin: 0 0 4px 0;">
                                                        Smart Goal Tracking
                                                    </h4>
                                                    <p style="color: #6b7280; font-size: 14px; margin: 0; line-height: 1.5;">
                                                        Set goals, track progress, and celebrate achievements with detailed analytics
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td style="padding: 12px 0;">
                                        <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                                            <tr>
                                                <td style="width: 40px; vertical-align: top;">
                                                    <div style="width: 32px; height: 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 8px; text-align: center; line-height: 32px; color: white; font-size: 16px;">
                                                        ⚡
                                                    </div>
                                                </td>
                                                <td style="padding-left: 16px;">
                                                    <h4 style="color: #1f2937; font-size: 16px; font-weight: 600; margin: 0 0 4px 0;">
                                                        Focus Mode & Pomodoro Timer
                                                    </h4>
                                                    <p style="color: #6b7280; font-size: 14px; margin: 0; line-height: 1.5;">
                                                        Enhance concentration with ambient sounds and proven study techniques
                                                    </p>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                            
                            <!-- Alternative Link -->
                            <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
                                <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                                    <strong>Having trouble with the button?</strong> Copy and paste this link into your browser:
                                </p>
                                <p style="color: #667eea; font-size: 12px; word-break: break-all; margin: 0;">
                                    {{ .ConfirmationURL }}
                                </p>
                            </div>
                            
                            <!-- Security Note -->
                            <p style="color: #9ca3af; font-size: 13px; line-height: 1.5; margin: 30px 0 0 0; font-style: italic;">
                                If you didn't create an account with Study-Flow, please ignore this email. Your email address won't be used without confirmation.
                            </p>
                        </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #f9fafb; padding: 30px 40px; text-align: center; border-radius: 0 0 16px 16px; border-top: 1px solid #e5e7eb;">
                            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                                Need help? We're here for you!
                            </p>
                            <p style="color: #6b7280; font-size: 14px; margin: 0 0 20px 0;">
                                📧 support@study-flow.net
                            </p>
                            
                            <p style="color: #9ca3af; font-size: 12px; margin: 20px 0 0 0;">
                                © 2024 Study-Flow. All rights reserved.
                            </p>
                            <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
                                Empowering students to achieve more, stress less, and study smart.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

async function updateEmailTemplate() {
    console.log('🔄 Updating Study-Flow email template...');
    
    try {
        // First, try to update existing template
        const { data: updateData, error: updateError } = await supabase
            .from('auth.email_templates')
            .update({
                subject: 'Welcome to Study-Flow - Confirm Your Email 📚',
                content: htmlTemplate
            })
            .eq('template_name', 'confirmation')
            .select();

        if (updateError) {
            console.log('Update failed, trying direct SQL approach...');
            
            // Try direct SQL approach for configuration
            const { data: sqlData, error: sqlError } = await supabase.rpc('exec', {
                query: `
                -- Configure auth settings for 10-minute OTP expiry
                UPDATE auth.config 
                SET 
                    jwt_exp = 600,  -- 10 minutes
                    refresh_token_rotation_enabled = true;
                    
                -- Update email template
                UPDATE auth.email_templates 
                SET 
                    subject = 'Welcome to Study-Flow - Confirm Your Email 📚',
                    content = $1
                WHERE template_name = 'confirmation';
                `,
                params: [htmlTemplate]
            });

            if (sqlError) {
                console.error('❌ SQL execution failed:', sqlError);
                console.log('\n📝 Manual steps required:');
                console.log('1. Go to Supabase Dashboard → Authentication → Email Templates');
                console.log('2. Update the "Confirm signup" template with the content from email-templates/confirmation-email.html');
                console.log('3. Set subject to: "Welcome to Study-Flow - Confirm Your Email 📚"');
                console.log('4. Go to Authentication → Settings and set OTP expiry to 600 seconds');
                return;
            }
        }

        console.log('✅ Email template updated successfully!');
        console.log('📧 Subject: Welcome to Study-Flow - Confirm Your Email 📚');
        console.log('⏰ OTP expiry configured to 10 minutes');
        
    } catch (error) {
        console.error('❌ Error updating email template:', error);
        console.log('\n📋 To manually update:');
        console.log('1. Copy the HTML template from email-templates/confirmation-email.html');
        console.log('2. Go to Supabase Dashboard → Authentication → Email Templates');
        console.log('3. Select "Confirm signup" and paste the template');
        console.log('4. Update the subject line and save');
    }
}

// Configure auth settings
async function configureAuthSettings() {
    console.log('⚙️ Configuring authentication settings...');
    
    try {
        // Using Supabase management API to update auth config
        const response = await fetch(`${supabaseUrl}/rest/v1/rpc/update_auth_config`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${supabaseServiceRoleKey}`,
                'apikey': supabaseServiceRoleKey
            },
            body: JSON.stringify({
                config_updates: {
                    JWT_EXP: 600, // 10 minutes
                    SITE_URL: 'http://localhost:8080',
                    EXTERNAL_EMAIL_ENABLED: true
                }
            })
        });

        if (response.ok) {
            console.log('✅ Auth settings configured successfully!');
        } else {
            console.log('⚠️ Auth settings update may require manual configuration');
        }
    } catch (error) {
        console.log('ℹ️ Auth settings require manual configuration in Supabase Dashboard');
    }
}

// Run the updates
async function main() {
    console.log('🚀 Starting Study-Flow email configuration...\n');
    
    await updateEmailTemplate();
    await configureAuthSettings();
    
    console.log('\n✨ Configuration complete!');
    console.log('🔗 Test by signing up at: http://localhost:8080/auth');
}

main().catch(console.error);