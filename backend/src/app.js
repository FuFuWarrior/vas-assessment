const express = require('express');
const multer = require('./middleware/multer-config')
// const multer = require('multer');
const cloudinary = require('./middleware/couldinary-config');
const pool = require('./model/db')
const fs = require('fs');

// const upload = multer()
const app = express();

app.use(express.json());

app.post( '/api/v1/product', multer, async (req, res) => {
    try {

        // const uploader = async (path) => await cloudinary.uploads(path, 'My Assets');

        // const url = [];
        // const read = fs.readdir('./IMAGES')
        // console.log(read)
        // const {path} = req.files
        // const newPath = await uploader(path)
        // url.push(newPath);
        // fs.unlinkSync(path);

        const formData = req.body;
        let {product_name} = formData;
        let {product_description} = formData;
        let {date_uploaded} = formData;
        let {date_edited} = formData;
        let {size} = formData;
        let {colour} = formData;
        let {quantity} = formData;
        let prices = formData;
        let array = [];
        let query = 'INSERT INTO product(product_name, product_description, date_uploaded, date_edited, product_varieties)  VALUES($1, $2, $3, $4, $5) RETURNING product_id, product_name, product_varieties'
        
        if (formData){
            if ((size.length > 1) && (colour.length > 1) && (quantity.length > 1) && (prices.length > 1)) {
                for (let i = 0;  i < size.length; i++) {
                array.push(    
                        {
                            size: size[i],
                            colour: colour[i],
                            quantity: quantity[i],
                            images: url,
                            prices: prices[i]
                        }
                    )
                }
            }else {
                array.push({
                    size: size[0],
                    colour: colour[0],
                    quantity: quantity[0],
                    prices: prices[0]
                })
            }

            let values = [product_name, product_description, date_uploaded, date_edited, JSON.stringify(array)];

            let result = await pool.query(query, values);
            console.log(result.rows)
            res.status(201).json({
                status: 'success',
                message: result.rows
            })

        } else{
            res.status(404).json({
                status: 'error',
                message: 'Fill the form'
            })
        }
        
    } catch (error) {
        res.status(500).json({
            status: 'error' ,
            message: 'Something Unexpected happened'
        })
        console.log(error)  
    }
    
});

app.get('api/v1/veiw-product', async (req, res) => {

    try {
        let query = 'SELECT product_name, product_description, date_uploaded, date_edited, product_varieties FROM product';
        // let values = []
        let result = await pool.query(query);

        res.status(200).json({
            status: 'success',
            message: result.rows
        });
        
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Something Unexpected Happened'
        })
    }

})

module.exports = app;