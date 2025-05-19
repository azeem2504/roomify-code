import Image from 'next/image'
import React from 'react'

function CardSection() {
  return (
    <section className="py-16 ">
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
    {/* Card 1 */}
    <div className="flex flex-col items-center">
      <Image src={'/upload.svg'} width={50} height={50} />
      <h3 className="font-semibold text-lg">Upload</h3>
      <p className="text-sm text-gray-600 mt-1">Upload Your Room Picture</p>
      <a href="#" className="text-blue-600 text-sm mt-2 hover:underline">Learn more →</a>
    </div>

    {/* Card 2 */}
    <div className="flex flex-col items-center">
    <Image src={'/design.svg'} width={50} height={50} />
      <h3 className="font-semibold text-lg">Select Design</h3>
      <p className="text-sm text-gray-600 mt-1">Select Design and Room Type</p>
      <a href="#" className="text-blue-600 text-sm mt-2 hover:underline">Learn more →</a>
    </div>

    {/* Card 3 */}
    <div className="flex flex-col items-center">
    <Image src={'/download.svg'} width={50} height={50} />
      <h3 className="font-semibold text-lg">Ready to Download</h3>
      <p className="text-sm text-gray-600 mt-1">Your Room / Home Interior Design is Ready</p>
      <a href="#" className="text-blue-600 text-sm mt-2 hover:underline">Learn more →</a>
    </div>

    {/* Card 4 */}
    <div className="flex flex-col items-center">
    <Image src={'/chat.svg'} width={50} height={50} />
      <h3 className="font-semibold text-lg">24/7 Support</h3>
      <p className="text-sm text-gray-600 mt-1">Contact us 24 hours a day, 7 days a week</p>
      <a href="#" className="text-blue-600 text-sm mt-2 hover:underline">Learn more →</a>
    </div>
  </div>
</section>

  )
}

export default CardSection
