/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017-06-24 14:46:06                          */
/*==============================================================*/


drop table if exists FRIEND;

drop table if exists RECORD;

drop table if exists SURVEY;

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
   id_record            int not null AUTO_INCREMENT,
   id_user              int not null,
   active               bool default TRUE,
   count_step           int,
   distance               double,
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
   id_user              int not null AUTO_INCREMENT,
   login                varchar(24),
   password             varchar(24),
   first_name           varchar(24),
   last_name            varchar(32),
   e_mail               varchar(64),
   primary key (id_user)
);

alter table FRIEND add constraint FK_LIKED_USER foreign key (id_friend)
      references USER (id_user) on delete restrict on update restrict;

alter table FRIEND add constraint FK_LIKING_USER foreign key (id_user)
      references USER (id_user) on delete restrict on update restrict;

alter table RECORD add constraint FK_RECORDED foreign key (id_user)
      references USER (id_user) on delete restrict on update restrict;

alter table SURVEY add constraint FK_SURVED foreign key (id_record)
      references RECORD (id_record) on delete restrict on update restrict;

