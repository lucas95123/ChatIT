create database chatit;
use chatit;
create table AccountInfo(
  user_id int primary key auto_increment,
  user_name varchar(50) not null,
  passwd varchar(50) not null,
  email_addr varchar(50) not null,
  state boolean,
  unique (user_name)
) DEFAULT CHARSET=utf8;

create table FriendInfo(
  user_id int not null,
  friend_id int not null,
  tag varchar(50),
  foreign key(user_id) references AccountInfo(user_id),
  foreign key(friend_id) references AccountInfo(user_id),
  primary key(user_id,friend_id)
) DEFAULT CHARSET=utf8;

create table OfflineMessage(
  user_id int not null,
  target_id int not null,
  message text not null,
  time_stamp datetime not null,
  foreign key(user_id) references AccountInfo(user_id),
  foreign key(target_id) references AccountInfo(user_id)
) DEFAULT CHARSET=utf8;
