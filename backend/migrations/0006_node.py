# Generated by Django 3.1.6 on 2021-03-22 23:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0005_auto_20210321_2321'),
    ]

    operations = [
        migrations.CreateModel(
            name='Node',
            fields=[
                ('host', models.CharField(default='127.0.0.1', max_length=200, primary_key=True, serialize=False)),
                ('remote_username', models.CharField(max_length=150)),
                ('remote_password', models.CharField(max_length=150)),
                ('local_username', models.CharField(max_length=150)),
                ('local_password', models.CharField(max_length=150)),
            ],
        ),
    ]