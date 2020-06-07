﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuestionHelper.Data.Models;

namespace QuestionHelper.Data {
    public interface IDataRepository {
        Task<IEnumerable<QuestionGetManyResponse>> GetQuestions ();
        Task<IEnumerable<QuestionGetManyResponse>> GetQuestionsWithAnswers ();
        Task<IEnumerable<QuestionGetManyResponse>> GetQuestionsBySearch (string search);
        Task<IEnumerable<QuestionGetManyResponse>> GetQuestionsBySearchWithPaging (string search, int pageNumber, int pageSize);
        Task<IEnumerable<QuestionGetManyResponse>> GetUnansweredQuestions ();
        Task<IEnumerable<QuestionGetManyResponse>> GetUnansweredQuestionsAsync ();
        Task<QuestionGetSingleResponse> GetQuestion (int questionId);
        Task<bool> QuestionExists (int questionId);
        Task<AnswerGetResponse> GetAnswer (int answerId);
        Task<QuestionGetSingleResponse> PostQuestion (QuestionPostFullRequest question);
        Task<QuestionGetSingleResponse> PutQuestion (int questionId, QuestionPutRequest question);
        Task DeleteQuestion (int questionId);
        Task<AnswerGetResponse> PostAnswer (AnswerPostFullRequest answer);
    }
}