﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using QuestionHelper.Data.Models;

namespace QuestionHelper.Data {
    public interface IDataRepository {
        IEnumerable<QuestionGetManyResponse> GetQuestions ();
        IEnumerable<QuestionGetManyResponse> GetQuestionsBySearch (string search);
        IEnumerable<QuestionGetManyResponse> GetUnansweredQuestions ();
        QuestionGetSingleResponse GetQuestion (int questionId);
        bool QuestionExists (int questionId);
        AnswerGetResponse GetAnswer (int answerId);
        QuestionGetSingleResponse PostQuestion (QuestionPostFullRequest question);
        QuestionGetSingleResponse PutQuestion (int questionId, QuestionPutRequest question);
        void DeleteQuestion (int questionId);
        AnswerGetResponse PostAnswer (AnswerPostFullRequest answer);
    }
}