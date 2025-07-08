// Quick test script for Notion API connection
// Run with: node test-notion.js

const NOTION_TOKEN = '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';
const NOTION_DATABASE_ID = '1eb39a7d43de80e2816fe83c2c6ef0fc';

async function testNotionConnection() {
  try {
    console.log('Testing Notion API connection...');
    
    // Test 1: Get database info
    const dbResponse = await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (!dbResponse.ok) {
      const errorText = await dbResponse.text();
      console.error('Database access failed:', {
        status: dbResponse.status,
        error: errorText
      });
      return;
    }

    const dbInfo = await dbResponse.json();
    console.log('Database found:', dbInfo.title?.[0]?.plain_text || 'Untitled');
    console.log('Database properties:', Object.keys(dbInfo.properties));

    // Test 2: Try creating a simple page
    const testPageData = {
      parent: { database_id: NOTION_DATABASE_ID },
      properties: {
        'Name': {
          title: [
            {
              text: {
                content: 'Test Application'
              }
            }
          ]
        }
      }
    };

    console.log('\nTesting page creation...');
    const pageResponse = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${NOTION_TOKEN}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify(testPageData),
    });

    if (!pageResponse.ok) {
      const errorText = await pageResponse.text();
      console.error('Page creation failed:', {
        status: pageResponse.status,
        error: errorText
      });
    } else {
      const result = await pageResponse.json();
      console.log('Test page created successfully:', result.id);
    }

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testNotionConnection();