mysql语句

create database blog;

drop table if exists `admin`;
create table `admin` (
  `id` int(11) NOT NULL auto_increment,
  `username` varchar(20) NOT NULL default '' COMMENT '用户名',
  `password` varchar(20) NOT NULL default '' COMMENT '密码',
  `create_time` varchar(20) NOT NULL default '' COMMENT '创建日期',
  primary key (`id`),
  unique key `username` (`username`)
)engine=innoDB default charset=utf8;
insert into admin (username, password, create_time) values ('vicky', '123456', '2016-12-13 10:58:00'); 



drop table if exists `category`;
create table `category` (
  `id` int(11) NOT NULL auto_increment,
  `name` varchar(20) NOT NULL default '' COMMENT '类别名',
  primary key (`id`),
  unique key `username` (`name`)
)engine=innoDB default charset=utf8;

drop table if exists `article`;
create table `article` (
  `id` int(11) NOT NULL auto_increment,
  `title` varchar(20) NOT NULL default '' COMMENT '标题',
  `author` varchar(20) NOT NULL default '' COMMENT '作者',
  `content` text NOT NULL COMMENT '内容',
  `point` varchar(20) NOT NULL default '' COMMENT '点赞',
  `create_time` varchar(20) NOT NULL default '' COMMENT '创建日期',
  primary key (`id`)
)engine=innoDB default charset=utf8;
insert into article (id, title, author, content, point, create_time) values (null, 'title', 'author', 'content', 'point', 'create_time'); 

drop table if exists `comment`;
create table `comment` (
  `id` int(11) NOT NULL auto_increment,
  `author` varchar(20) NOT NULL default '' COMMENT '作者',
  `content` varchar(20) NOT NULL default '' COMMENT '内容',
  `articleId` int(11) NOT NULL COMMENT '文章id',
  ｀commentId｀ int(11) NOT NULL COMMENT '评论id',
  `create_time` varchar(20) NOT NULL default '' COMMENT '创建日期',
  primary key (`id`),
  unique key `id` (`id`)
)engine=innoDB default charset=utf8;
