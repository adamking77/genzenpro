# Notion Database Integration Setup

## 1. Create Notion Integration

1. Go to https://www.notion.so/my-integrations
2. Click "Create new integration"
3. Name it "GenZen Pro Applications"
4. Select your workspace
5. Copy the integration token (starts with `secret_`)

## 2. Create Notion Database

Create a new database in Notion with these properties:

### Required Properties:
- **Name** (Title)
- **Email** (Email)
- **Company** (Text)
- **Role** (Text)
- **Situation** (Multi-select)
  - Options: "High-stakes negotiation requiring strategic leverage", "Communication challenges with sophisticated manipulation", "Potential threat to reputation or legacy", "Need for strategic protection in complex situation", "Extraction from toxic situation or arrangement", "Other"
- **Challenges** (Text)
- **Solutions Tried** (Text)
- **Timeline** (Select)
  - Options: "Immediate (within days)", "Short-term (within weeks)", "Medium-term (within months)", "Strategic (ongoing situation)"
- **Desired Outcomes** (Multi-select)
  - Options: "Maintaining control in high-stakes communications", "Seeing manipulation patterns before they take effect", "Transforming vulnerabilities into strategic advantages", "Designing effective exit strategies while protecting assets", "Creating leveraged control over critical situations", "Restoring power in situations where it's being systematically stripped away"
- **Referral Source** (Select)
  - Options: "Web search", "Referral", "LinkedIn", "Free Resource", "Other"
- **Additional Info** (Text)
- **Submission Date** (Date)
- **Status** (Select)
  - Options: "New Application", "Under Review", "Accepted", "Rejected", "Follow-up Needed"

## 3. Share Database with Integration

1. In your Notion database, click "Share" (top right)
2. Click "Invite" and search for your integration name
3. Select your integration and give it "Edit" permissions

## 4. Get Database ID

From your database URL: `https://notion.so/workspace/DATABASE_ID?v=VIEW_ID`
Copy the DATABASE_ID part (32-character string)

## 5. Set Environment Variables

Create a `.env` file in your project root:

```
NOTION_TOKEN=secret_your_integration_token_here
NOTION_DATABASE_ID=your_32_character_database_id_here
```

## 6. Test Integration

1. Deploy your changes
2. Submit a test application through your form
3. Check that a new entry appears in your Notion database

## Database Schema Reference

The integration expects these exact property names in your Notion database:
- Name (Title)
- Email (Email) 
- Company (Text)
- Role (Text)
- Situation (Multi-select)
- Challenges (Text)
- Solutions Tried (Text)
- Timeline (Select)
- Desired Outcomes (Multi-select)
- Referral Source (Select)
- Additional Info (Text)
- Submission Date (Date)
- Status (Select)

## Troubleshooting

- **403 Error**: Check that your integration has access to the database
- **400 Error**: Verify database property names match exactly
- **500 Error**: Check environment variables are set correctly