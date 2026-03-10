- 1.导入mongo-java-drver-2.9.3.jar
- 2.API
    - ```java
      Mongo m = new Mongo("localhost", 27017);
      DB db = m.getDB("mydb");
      boolean auth = db.authenticate("root", "root".toCharArray());
      System.out.println("身份认证" + auth);
      // 获得所有数据库名
      for (String s : m.getDatabaseNames()) {
              System.out.println("db : " + s);
      }
      // 删除数据库
      m.dropDatabase("my_new_db");
      // 获得collection列表
      Set<String> colls = db.getCollectionNames();
      for (String s : colls) {
              System.out.println("collection : " + s);
      }
      // 获得一个collection
      DBCollection coll = db.getCollection("testCollection");
      // 创建document(包括内嵌文档)
      DBObject doc = new BasicDBObject().append("appendField", "appendField");
      doc.put("name", "MongoDB");
      doc.put("type", "database");
      doc.put("count", 1);
      DBObject info = new BasicDBObject();
      info.put("x", 203);
      info.put("y", 102);
      doc.put("info", info);
      // 插入文档
      coll.insert(doc);
      // 查询文档
      DBObject doc2 = coll.findOne();
      System.out.println(doc2);
      // 统计文档数
      long count = coll.getCount();
      System.out.println(count);
      // 用游标遍历
      DBCursor cursor = coll.find();
      while (cursor.hasNext()) {
              DBObject object = cursor.next();
              System.out.println(object);
      }
      // 查询
      DBObject query = new BasicDBObject();
      query.put("i", 71);
      cursor = coll.find(query);
      // 条件查询
      query = new BasicDBObject();
      query.put("i", new BasicDBObject("$gt", 50)); // i>50
      cursor = coll.find(query);
      // 创建索引
      coll.createIndex(new BasicDBObject("i", 1)); // 1代表升序 , -1是降序
      // 查询索引
      List<DBObject> list = coll.getIndexInfo();
              for (DBObject index : list) {
              System.out.println("索引 : " + index);
      }
      ```
- 类型
    - // 自动生成的唯一ID
    - ObjectId id = new ObjectId();
    - System.out.println(id);
