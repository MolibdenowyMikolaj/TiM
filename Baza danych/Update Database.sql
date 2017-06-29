-- CREATE TEMPEORARY DATABASE

create table FRIEND_temp
(
   id_user              int not null,
   id_friend            int not null,
   since                date
);
create table RECORD_temp
(
   id_record            int not null,
   id_user              int not null,
   length               bool default TRUE,
   time					int
);
create table USER_temp
(
   id_user              int not null,
   login                varchar(24),
   password             varchar(24),
   first_name           varchar(24),
   last_name            varchar(32),
   e_mail               varchar(64)
);

-- COPY CURRENT DATA TO TEMPORARY DATABASE

insert into USER_temp select id_user, login, password, first_name, last_name, e_mail from USER;
insert into RECORD_temp select id_record, id_user, length, time from RECORD;
insert into FRIEND_temp select id_user, id_friend, since from FRIEND;

-- CREATE FINAL DATABASE

/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017-06-24 14:46:06                          */
/*==============================================================*/


drop table if exists FRIEND;

drop table if exists SURVEY;

drop table if exists RECORD;

drop table if exists USER;

/*==============================================================*/
/* Table: FRIEND                                                */
/*==============================================================*/
create table FRIEND
(
   id_user              int not null,
   id_friend            int not null,
   since                date,
   primary key (id_user, id_friend)
);

/*==============================================================*/
/* Table: RECORD                                                */
/*==============================================================*/
create table RECORD
(
   id_record            int not null,
   id_user              int not null,
   active               bool default 1,
   count_step           int,
   distance             double,
   time_start           datetime,
   time_end             datetime,
   primary key (id_record)
);

/*==============================================================*/
/* Table: SURVEY                                                */
/*==============================================================*/
create table SURVEY
(
   id_survey            int not null AUTO_INCREMENT,
   id_record            int not null,
   count_step           int,
   time_start           datetime,
   latitude_start       double,
   longitude_start      double,
   time_end             datetime,
   latitude_end         double,
   longitude_end        double,
   primary key (id_survey)
);

/*==============================================================*/
/* Table: USER                                                  */
/*==============================================================*/
create table USER
(
   id_user              int not null,
   login                varchar(24),
   password             varchar(24),
   first_name           varchar(24),
   last_name            varchar(32),
   e_mail               varchar(64),
   primary key (id_user)
);
      
-- TRANSFER DATA BACK TO MAIN DATABASE

insert into USER select * from USER_temp;
insert into FRIEND select * from FRIEND_temp;
insert into RECORD select id_record, id_user, 1, '13', length, now()-100, now() from RECORD_temp;

-- UPDATE CONSTRAINTS

SET SESSION sql_mode='NO_AUTO_VALUE_ON_ZERO';

alter table USER change column id_user id_user int not null auto_increment;

alter table RECORD change column id_record id_record int not null auto_increment;

alter table FRIEND add constraint FK_LIKED_USER foreign key (id_friend)
      references USER (id_user) on delete restrict on update restrict;

alter table FRIEND add constraint FK_LIKING_USER foreign key (id_user)
      references USER (id_user) on delete restrict on update restrict;

alter table RECORD add constraint FK_RECORDED foreign key (id_user)
      references USER (id_user) on delete restrict on update restrict;

alter table SURVEY add constraint FK_SURVED foreign key (id_record)
      references RECORD (id_record) on delete restrict on update restrict;
      
SET SESSION sql_mode='';

-- DROP TEMPORARY DATABASE

drop table RECORD_temp;
drop table FRIEND_temp;
drop table USER_temp;