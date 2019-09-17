
const About = require("../models/content-about");
const Policy = require("../models/content-policy");
const Term = require("../models/content-term");
const Contact = require("../models/content-contact");
const AppProcess = require("../models/content-app-process");
const FooterLink = require("../models/content-footer-link");
const Faq = require("../models/content-faq");
const HomeIcon = require("../models/content-home-icon");
const Story = require("../models/content-story");

const genericHelper = require("../helpers/genericResponse");



exports.addAbout = async (req, res, next) => {

  const model = req.body;
  try {
    await About.destroy({where: {}});
    await About.create(model);
  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});

};

exports.addPolicy = async (req, res, next) => {

  const model = req.body;
  try {
    await Policy.destroy({where: {}});
    await Policy.create(model);
  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});

}

exports.addTerm = async (req, res, next) => {
  const model = req.body;
  try {
    await Term.destroy({where: {}});
    await Term.create(model);
  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});

}


/* Contact Logic */
exports.addContact = async (req, res, next) => {
  const model = req.body;
  try {
    await Contact.create(model);
  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});
}

exports.editContact = async (req, res, next) => {
  const model = req.body;
  try {
    // await Contact.create(model);
    await Contact.update(model,{where: { id: model.id }});
  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});
}

/* Contact logic end */


exports.addStory = async (req, res, next) => {

  const model = req.body;
  try {
    await Story.create(model);
  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});

};


exports.deleteStory = async (req, res, next) => {

  try {
    await Story.destroy({
      where : {id: req.query.id}
    });

  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});

};


/* Footer Link */

exports.addFooterLink  = async (req, res, next) => {

  const model = req.body;
  try {
    await FooterLink.create(model);
  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});

};


exports.deleteFooterLink = async (req, res, next) => {

  try {
    await FooterLink.destroy({
      where : {id: req.query.id}
    });

  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});

};



/* End */


exports.addHomeIcon = async (req, res, next) => {

  const model = req.body;
  try {

    var imgUrl = genericHelper.getImageUrlFromArray(req, req.files[0]);

    await HomeIcon.create({
      icon:imgUrl,
      text: model.text
    });
  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});

};

exports.editHomeIcon = async (req, res, next) => {

  const model = req.body;
  try {

    var imgUrl = genericHelper.getImageUrlFromArray(req, req.files[0]);

    await HomeIcon.update({
      icon:imgUrl,
      text: model.text
  },{where: { id: model.id }});


  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});

};

/* App functionality logic */

exports.addAppProcess = async (req, res, next) => {

  const model = req.body;
  try {
    await AppProcess.create(model);
  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});
};

exports.editAppProcess = async (req, res, next) => {

  const model = req.body;
  try {
    await AppProcess.update(model,{where: { id: model.id }});
  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});
};

/* App functionality logic end */



exports.addFaq = async (req, res, next) => {

  const model = req.body;
  try {
    await Faq.create(model);
  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(201).json({messgae: '', data :null});

};




/* Get All Data  */

exports.getAllData = async (req, res, next) => {

  var obj;
  try {
     const processes= await AppProcess.findAll();
     const stories = await Story.findAll();
     const contacts= await Contact.findAll();
     const homeIcons = await HomeIcon.findAll();
     const faqs = await Faq.findAll();
     const footerLinks = await FooterLink.findAll();
     const term = await Term.findOne();
     const about= await About.findOne();
     const policy = await Policy.findOne();

     obj = {
      processes: processes,
      stories: stories,
      contacts: contacts,
      homeIcons: homeIcons,
      faqs: faqs,
      footerLinks: footerLinks,
      about:about,
      policy: policy,
      term: term
     }
  } catch (error) {
    res.status(500).json({messgae: error, data: {}});
  }
  res.status(200).json({messgae: '', data :obj});

}
