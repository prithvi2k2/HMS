import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    // Suitable themes : dark,light
    // Modified themes @ /tailwind.config.js - Stylized light and dark themes inspired by DaisyUIs Forest themed round buttons
    <Html data-theme="customLight">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}