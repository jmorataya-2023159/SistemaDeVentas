import Category from './category.model.js'

export const addCategory = async(req, res)=>{
    try {
        let data = req.body
        let category = new Category(data)
        await category.save()
        return res.send({message: 'New category saved successfully'})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error saving category', error})
    }
}
export const listCategory = async(req, res)=>{
    try {
        let category = await Category.find()
        return res.send(category)
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'General Error'})
    }
}
export const findCategoryById = async(req,res)=>{
    try {
        const {id} = req.params
        const category = await Category.findById(id)
        if (!category) return res.status(404).send(
            {
                success:false,
                message: 'Category not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Category found: ',
                category
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                error
            }
        )
    }
}
export const updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        if (!id) return res.status(400).send({message:'Incorrect Id'});
        const updatedCategory = await Category.findByIdAndUpdate(id, data, {new: true});
        if (!updatedCategory) return res.status(404).send({message:'Category not found'});
        return res.send({message:'Category updated successfully',updatedCategory});
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General Error', err });
    }
}
export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(400).send({ message: 'Incorrect Id' });
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) return res.status(404).send({ message: 'Category not found' });
        return res.send({message:'Category deleted successfully'});
    } catch (error) {
        console.error(error);
        return res.status(500).send({message:'General Error', error});
    }
}

