<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">

<xsl:output method="html" encoding="UTF-8" />

<xsl:template match="/">
<html lang="en">
<head>
  <title>XML Sitemap</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial;
      margin: 20px;
      color: #333;
      background: #fff;
    }
    h1 {
      font-size: 22px;
      margin-bottom: 6px;
    }
    .meta {
      font-size: 14px;
      color: #555;
      margin-bottom: 16px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 8px 10px;
      border-bottom: 1px solid #ddd;
      font-size: 14px;
    }
    th {
      background: #f7f7f7;
      text-align: left;
    }
    a {
      color: #0073aa;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>

<body>

  <h1>XML Sitemap</h1>

  <div class="meta">
    This sitemap contains
    <strong>
      <xsl:value-of select="count(s:urlset/s:url)" />
    </strong>
    URLs.
  </div>

  <table>
    <thead>
      <tr>
        <th>URL</th>
        <th>Last Modified</th>
      </tr>
    </thead>
    <tbody>
      <xsl:for-each select="s:urlset/s:url">
        <tr>
          <td>
            <a href="{s:loc}">
              <xsl:value-of select="s:loc" />
            </a>
          </td>
          <td>
            <xsl:value-of select="s:lastmod" />
          </td>
        </tr>
      </xsl:for-each>
    </tbody>
  </table>

</body>
</html>
</xsl:template>

</xsl:stylesheet>
