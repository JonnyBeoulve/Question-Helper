using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace QuestionHelper.Data.Models {
    public class QuestionPutRequest {
        [StringLength (100)]
        public string Title { get; set; }
        public string Content { get; set; }
    }
}