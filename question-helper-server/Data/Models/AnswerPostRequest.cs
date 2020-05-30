using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace QuestionHelper.Data.Models {
    public class AnswerPostRequest {
        [Required]
        public int? QuestionId { get; set; }

        [Required]
        public string Content { get; set; }
    }
}