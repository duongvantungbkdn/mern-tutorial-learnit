const Data = require('../models/dataModel');

var DataControllers = {   
    // ===============create data======================
    create: async(req,res) => {
        const {title, description, url, status} = req.body;

        // validation
        if (!title) {
            return res
                .status(400)
                .json({
                    success: false, 
                    massage: 'Title is required'
                });
        };

        try {            
            const newData = new Data({
                title,
                description,
                url: url.startsWith('http://'||'https://') ? url : `http://${url}`,
                status: status || 'TO LEARN',
                user: req.userId
            });
            // save new Data to mongodb
            await newData.save();

            // Create successfully
            res.json({
                success: true, 
                message: 'Create Data successfully',
                data: newData
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        };
    },     
    
    //===============list data========================
    list: async(req,res) => {
        try {
            const datas = await Data.find({user: req.userId}).populate('user',['username']);
            res.json({success: true, datas});
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        }
    },

    //===============read data========================
    read: (req,res) => {
        res.sed('read data')
    },

    //=================update data==================
    update: async(req,res) => {
        const {title, description, url, status} = req.body;

        // validation
        if (!title) {
            return res
                .status(400)
                .json({
                    success: false, 
                    massage: 'Title is required'
                });
        };

        try {            
            let updatedData = {
                title,
                description: description || '',
                url: (url.startsWith('http://') ? url : `http://${url}`) || '',
                status: status || 'TO LEARN'
            };

            // update condition
            const dataUpdateCondition = {_id: req.params.id, user: req.userId};
            updatedData = await Data.findOneAndUpdate(dataUpdateCondition, updatedData, {new: true});

            // User not authrized to update Data or Data not found
            if(!updatedData) {
                return res.status(401).json({success: false, message: 'Data not found or User not authrized'});
            }

            // update successfully
            res.json({success: true, message: 'Update successfully',data: updatedData});            
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        };
    },

    //===============delete data========================
    delete: async(req,res) => {
        try {         
            // delete condition
            const dataDeleteCondition = {_id: req.params.id, user: req.userId};
            const deletedData = await Data.findOneAndDelete(dataDeleteCondition);

            // User not authrized to update Data or Data not found
            if(!deletedData) {
                return res.status(401).json({success: false, message: 'Data not found or User not authrized'});
            }

            // delete successfully
            res.json({success: true, message: 'Delete successfully', data: deletedData});            
        } catch (error) {
            console.log(error);
            res.status(500).json({success:false, message:'Internal server error'});
        };
    },
};

module.exports = DataControllers;
