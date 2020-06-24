const { createContainer, asClass, asValue, asFunction } = require('awilix')

// Config
const config = require('../config');

const app = require('.');

// Services
const { HomeService } = require('../services')

// Controllers
const { HomeController, UserController, IdeaController, CommentController } = require('../controllers')

// Routes
const { HomeRoutes } = require('../routes/index.routes')
const Routes = require('../routes');

// models
const { User, Comment, Idea } = require('../models')

// repositories

const { UserRepository, CommentRepository, IdeaRepository } = require('../repositories')

const container = createContainer();

container.register({
        app: asClass(app).singleton(),
        router: asFunction(Routes).singleton(),
        config: asValue(config)
    })
    .register({
        HomeService: asClass(HomeService).singleton()
    }).register({
        HomeController: asClass(HomeController.bind(HomeController)).singleton(),
        UserController: asClass(UserController.bind(UserController)).singleton(),
        IdeaController: asClass(IdeaController.bind(IdeaController)).singleton(),
        CommentController: asClass(CommentController.bind(CommentController)).singleton()

    }).register({
        HomeRoutes: asFunction(HomeRoutes).singleton()
    }).register({
        User: asValue(User),
        Idea: asValue(Idea),
        Comment: asValue(Comment),
    }).register({
        UserRepository: asClass(UserRepository).singleton(),
        CommentRepository: asClass(CommentRepository).singleton(),
        IdeaRepository: asClass(IdeaRepository).singleton(),
    })


module.exports = container;