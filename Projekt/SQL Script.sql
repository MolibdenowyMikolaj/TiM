/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017-06-04 22:51:13                          */
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
   id_record            int not null,
   id_user              int,
   length               int,
   time                 int,
   primary key (id_record)
);

/*==============================================================*/
/* Table: SURVEY                                                */
/*==============================================================*/
create table SURVEY
(
   id_survey            int not null,
   id_record            int,
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

alter table FRIEND add constraint FK_LIKED_USER foreign key (id_friend)
      references USER (id_user) on delete restrict on update restrict;

alter table FRIEND add constraint FK_LIKING_USER foreign key (id_user)
      references USER (id_user) on delete restrict on update restrict;

alter table RECORD add constraint FK_RECORDED foreign key (id_user)
      references USER (id_user) on delete restrict on update restrict;

alter table SURVEY add constraint FK_SURVED foreign key (id_record)
      references RECORD (id_record) on delete restrict on update restrict;

