import sharp from "sharp"
import { readdir, rm, mkdir, cp } from "fs/promises"
import { join, extname } from "path"

import { sizes } from "../src/components/Image/imageConfig.js"

const imagesDir = join(process.cwd(), `images`)
const publicDir = join(process.cwd(), `public`)

function createSize(file, width = 300, ending = "sm", subFolder = "") {
  const fileName = file.split(".")
  const name = fileName.slice(0, -1).join(".") // In case the image name contains dots...
  const suffix = fileName.slice(-1)[0]

  // Replace spaces with underscores to prevent any URI encoding issues with responsive images
  // (see Image component for client-side fix)
  const fixedImageName = name.split(" ").join("_")

  sharp(join(imagesDir, subFolder, file), { limitInputPixels: 0 })
    .resize({ width })
    .toFile(
      join(
        publicDir,
        `images${subFolder}/${fixedImageName}-${ending}.${suffix}`
      ),
      (err) => {
        if (err) console.log(`Failed writing ${ending}: `, err)
        // else console.log(`Done writing ${fixedImageName} ${ending}`)
      }
    )
}

const cleanFiles = (d) => d !== ".DS_Store" && d.split(".").length > 1

async function prepareImages() {
  const files = await readdir(imagesDir)

  const originalImages = files.filter((d) => cleanFiles(d))

  await rm(join(publicDir, "images"), { recursive: true, force: true })
  await mkdir(join(publicDir, "images"))

  originalImages.forEach((file) => {
    const isSvg = extname(file) === ".svg"
    if (isSvg) {
      cp(join(imagesDir, file), join(publicDir, "images", file))
    } else {
      sizes.forEach(({ ending, size }) => {
        createSize(file, size, ending)
      })
    }
  })
}

prepareImages()
