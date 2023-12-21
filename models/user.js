'use-strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { index } = require('./index')

const users = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
})

// Pre-validation hook for username
users.pre('validate', function (next) {
    if (!this.username || this.username.trim().length === 0) {
        next(new Error('Username is required'))
    } else {
        next()
    }
})

// Pre-validation hook for email
users.pre('validate', function (next) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!this.email || !emailRegex.test(this.email)) {
        next(new Error('Valid email is required'))
    } else {
        next()
    }
})

// Pre-validation hook for password
users.pre('validate', function (next) {
    if (!this.password || this.password.length < 6) {
        next(new Error('Password must be at least 6 characters'))
    } else {
        next()
    }
})

// Pre-validation hook to hash the password before saving
users.pre('save', async function (next) {
    const user = this
    if (!user.isModified('password')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password, salt)
        user.password = hashedPassword
        next()
    } catch (error) {
        return next(error)
    }
})

const User = mongoose.model('User', users)
exports.User = User
