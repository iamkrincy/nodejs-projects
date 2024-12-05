const categoryModel = require('../models/CategoryModel');

const subcategoryModel = require('../models/subcategoryModel');

const subcategoryPage = async(req,res) => {
       try {
        return res.render('view_subcategory')
       } catch (error) {
        console.log(error);
        return false;
       }
}

const addsubCategory = async (req,res) => {
      try {
        let category = await categoryModel.find({status : "active"})

        return res.render('add_subcategory',{category});
      } catch (error) {
        console.log(error);
        return false;
      }
}

const insertSubcategory = async (req,res) => {
  try {
    const {category,subcategory} = req.body;
    await subcategoryModel.create({
      categoryId : category,
      subcategory : subcategory,
    })
    return res.redirect('/subcategory/addsubcategory')
  } catch (error) {
    console.log(error);
    return false;
  }
}
module.exports = { subcategoryPage,addsubCategory,insertSubcategory}