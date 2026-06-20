import QRCode from "qrcode"
import { writeFileSync } from "fs"

const BASE_URL = "https://bfd-five.vercel.app/"

for (let i = 1; i <= 7; i++) {
  const url = `${BASE_URL}?card=${i}`
  const outPath = `public/qr_${i}.png`

  await QRCode.toFile(outPath, url, {
    type: "png",
    width: 400,
    margin: 2,
    errorCorrectionLevel: "H",
    color: { dark: "#000000", light: "#ffffff" },
  })

  console.log(`✓ qr_${i}.png → ${url}`)
}

console.log("\n완료! public/qr_1.png ~ public/qr_7.png 생성됨")
