/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017-06-04 12:53:06                          */
/*==============================================================*/


drop table if exists RECORD;

drop table if exists SURVEY;

drop table if exists USER;

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
   password             varbinary(24),
   first_name           varchar(24),
   last_name            varchar(32),
   e_mail               varchar(64),
   primary key (id_user)
);

alter table RECORD add constraint FK_Reference_1 foreign key (id_user)
      references USER (id_user) on delete restrict on update restrict;

alter table SURVEY add constraint FK_Reference_2 foreign key (id_record)
      references RECORD (id_record) on delete restrict on update restrict;

