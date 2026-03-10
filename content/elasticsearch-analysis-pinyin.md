- ```javascript
  "analysis" : {
      "analyzer" : {
          "pinyin_analyzer" : {
              "tokenizer" : "my_pinyin",
              "filter" : "word_delimiter"
          }
      },
      "tokenizer" : {
          "my_pinyin" : {
              # 单字
              "type" : "pinyin",
              "first_letter" : "none",
              "padding_char" : " "
          },
          "my_pinyin_fisrt_letter" : {
              # 首字母, 如北京为bj
              "type" : "pinyin",
              "first_letter" : true,
              "padding_char" : " "
          },
      }
  }
  ```
- ```javascript
  "analysis" : {
      "tokenizer" : {
          "my_pinyin" : {
              "type" : "pinyin",
              "keep_separate_first_letter" : false,
              "keep_full_pinyin" : true,
              "keep_original" : true,
              "limit_first_letter_length" : 16,
              "lowercase" : true,
              "remove_duplicated_term" : true
          }
      },
      "analyzer" : {
          "pinyin_analyzer" : {
              "tokenizer" : "my_pinyin"
          }
      }
  }
  "properties": {
      "name": {
          "type": "keyword",
          "fields": {
              "pinyin": {
                  "type": "text",
                  "store": "no",
                  "term_vector": "with_offsets",
                  "analyzer": "pinyin_analyzer",
                  "boost": 10
              }
          }
      }
  }
  ```
- ik-pinyin
- ```javascript
  "analysis": {
      "filter": {
          "pinyin1": {
              "type": "pinyin"
          }
      },
      "analyzer": {
          "ik_pinyin_analyzer": {
              "filter": ["pinyin1","word_delimiter"],
              "type": "custom",
              "tokenizer": "ik_smart"
          }
      }
  }
  ```
