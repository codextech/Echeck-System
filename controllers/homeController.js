
const homeHelper = require("../helpers/homeHelper");
const genericHelper = require("../helpers/genericResponse");

// Slider images
exports.getSliderImages = async (req, res, next) => {
  var images;
  try {
    images = await  homeHelper.getSliderImages();

  } catch (error) {
    res.status(500).json({ message: error });
  }
  res.status(200).json({ message: "",  data: images});
}


exports.addSliderImages = async (req, res, next) => {

  var sliderImages;
  var imgArrays = [];
  try {

    req.files.forEach(file => {
    var url = genericHelper.getImageUrlFromArray(req, file);

    imgArrays.push({
      sliderImage: url,
    });
    });

    sliderImages = await homeHelper.addSliderImages(imgArrays);


    if (sliderImages.length == 0) {
      res.status(400).json({messgae: '', data: {}});
    }
  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: 'Uploaded', data :sliderImages});

};




//admin

exports.deleteSliderImages = async (req, res, next) => {

  const sliderId = req.query.sliderId;
  try {

    await homeHelper.deleteSliderImage(sliderId);

  } catch (error) {
    res.status(500).json({ message: error });
  }

  res.status(200).json({ message: 'Deleted', data: {} });

}







