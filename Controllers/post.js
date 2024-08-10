import express from 'express'
import crypto from 'node:crypto'
export const postRouter = express.Router()

import { Posts } from '../constants/index.js'

postRouter.get('/posts', (req, res) => {
    try {
        res.json(Posts)
    } catch (error) {
        res.status(500).json({Message: 'Internal server error'})
    }
})

postRouter.get('/posts/:id', (req, res) => {
    try {
        const {id} = req.params

        const post = Posts.find(p => p.uid == id)

        if (!post) {
            return res.status(404).json({Message: 'Post not found'})
        }

        res.json({
            ok: true,
            message: post
        })
    } catch (error) {
        res.status(500).json({Message: 'Internal server error'})
    }
})

postRouter.post('/posts', (req, res) => {
    try {
        const newPost ={
            uid: crypto.randomUUID(),
            ...req.body
        }

        Posts.push(newPost)

        res.status(201).json({
            ok: true,
            message: newPost
        })
    } catch (error) {
        
    }
})