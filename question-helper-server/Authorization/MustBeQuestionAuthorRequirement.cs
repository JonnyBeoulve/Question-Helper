using Microsoft.AspNetCore.Authorization;

namespace QuestionHelper.Authorization {
    public class MustBeQuestionAuthorRequirement : IAuthorizationRequirement {
        public MustBeQuestionAuthorRequirement () { }
    }
}