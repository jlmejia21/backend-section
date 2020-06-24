const BaseService = require('./base.service')

let _commentRepository = null;
let _ideaRepository = null;

class CommentService extends BaseService {
    constructor({ CommentRepository, IdeaRepository }) {
        super(CommentRepository);
        _commentRepository = CommentRepository;
        _ideaRepository = IdeaRepository;
    }

    async getIdeaComments(ideaId) {
        if (!ideaId) {
            const error = new Error();
            error.status = 400;
            error.message = 'ideaId must be sent';
            throw error;
        }
        const idea = await this._ideaRepository.get(ideaId);
        if (!idea) {
            const error = new Error();
            error.status = 404;
            error.message = 'entity does not found';
            throw error;
        }
        const { comments } = idea;
        return comments;
    }

    async createComment(comment, ideaId) {
        if (!ideaId) {
            const error = new Error();
            error.status = 400;
            error.message = 'ideaId must be sent';
            throw error;
        }
        const idea = await this._ideaRepository.get(ideaId);
        if (!idea) {
            const error = new Error();
            error.status = 404;
            error.message = 'entity does not found';
            throw error;
        }

        const createdComment = await this._commentRepository.create(comment);
        idea.comments.push(createdComment);
        return await this._ideaRepository.update(ideaId, { comments: idea.comments });
    }




}

module.exports = CommentService;