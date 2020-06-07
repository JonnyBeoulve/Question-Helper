using QuestionHelper.Data.Models;

namespace QuestionHelper.Data {
    public interface IQuestionCache {
        QuestionGetSingleResponse Get (int questionId);
        void Remove (int questionId);
        void Set (QuestionGetSingleResponse question);
    }
}