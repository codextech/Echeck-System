
const Slider = require("../models/slider");


exports.getSliderImages = async () => {

  var images;
  try {

    images = await Slider.findAll({
      order: [['sliderId', 'DESC']],
    });

  } catch (error) {
      console.log(error);
  }
  return images;
}



exports.addSliderImages = async (model) => {

  var imgs;
  try {

      // creat doc
      imgs = await Slider.bulkCreate(model);

  } catch (error) {
      console.log(error);
  }
  return imgs;
}

exports.deleteSliderImage = async (id) => {

  var image;
  try {

    await Slider.destroy({
      where: {sliderId: id}
    });

  } catch (error) {
      console.log(error);
  }
}


