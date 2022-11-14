const sharp = require("sharp")
const fs = require("fs/promises")
const imagesConfig = require("../images.config.js")
const path = require("path")

const { readdir, rm, mkdir } = fs
const { sizes } = imagesConfig
const { join } = path

const imagesDir = join(process.cwd(), `images`)
const publicDir = join(process.cwd(), `public`)

function createSize(file, width = 300, ending = "sm") {
  const fileName = file.split(".")
  const name = fileName.slice(0, -1).join(".")
  const suffix = fileName.slice(-1)[0]

  const fixedImageName = name.split(" ").join("_")

  sharp(join(imagesDir, file))
    .resize({ width })
    .toFile(
      join(publicDir, `images/${fixedImageName}-${ending}.${suffix}`),
      (err) => {
        if (err) console.log(`Failed writing ${ending}: `, err)
        else console.log(`Done writing ${fixedImageName} ${ending}`)
      }
    )
}

async function prepareImages() {
  const files = await readdir(imagesDir)
  const originalImages = files.filter((d) => d !== ".DS_Store")

  try {
    await rm(join(publicDir, "images"), { recursive: true })
    await mkdir(join(publicDir, "images"))
  } catch {
    await mkdir(join(publicDir, "images"))
  }

  originalImages.forEach((file) => {
    sizes.forEach(({ ending, size }) => {
      createSize(file, size, ending)
    })
  })
}

prepareImages()
