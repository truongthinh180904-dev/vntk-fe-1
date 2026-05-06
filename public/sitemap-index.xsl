<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

<xsl:output method="html" encoding="UTF-8" />

<xsl:template match="/">
<html>
<head>
  <title>XML Sitemap</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      margin: 20px;
      color: #333;
    }
    h1 {
      font-size: 24px;
    }
    p {
      font-size: 14px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin-top: 15px;
    }
    th, td {
      padding: 8px 10px;
      border-bottom: 1px solid #ddd;
      font-size: 14px;
    }
    th {
      text-align: left;
      background: #f7f7f7;
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

  <p>
    You can find more information about XML sitemaps on
    <a href="https://www.sitemaps.org" target="_blank">sitemaps.org</a>.
  </p>

  <p>
    This XML Sitemap Index file contains
    <strong>
      <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)" />
    </strong>
    sitemaps.
  </p>

  <table>
    <thead>
      <tr>
        <th>Sitemap</th>
        <th>Last Modified</th>
      </tr>
    </thead>
    <tbody>
      <xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
        <tr>
          <td>
            <a href="{sitemap:loc}">
              <xsl:value-of select="sitemap:loc" />
            </a>
          </td>
          <td>
            <xsl:value-of select="sitemap:lastmod" />
          </td>
        </tr>
      </xsl:for-each>
    </tbody>
  </table>
</body>
</html>
</xsl:template>

</xsl:stylesheet>
