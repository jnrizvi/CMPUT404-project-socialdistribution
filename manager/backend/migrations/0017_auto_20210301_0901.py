# Generated by Django 3.1.6 on 2021-03-01 09:01

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0016_auto_20210301_0712'),
    ]

    operations = [
        migrations.AddField(
            model_name='author',
            name='token',
            field=models.CharField(default=1, editable=False, max_length=100, primary_key=True, serialize=False, unique=True),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='author',
            name='author_id',
            field=models.CharField(default=uuid.uuid4, editable=False, max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='comment',
            name='id',
            field=models.CharField(default='cbaf0d6e4ccc42e6ae787266632d1154', editable=False, max_length=100, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='like',
            name='id',
            field=models.CharField(default='ca6bede94f354dc1be53085ae79a45b8', editable=False, max_length=100, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='id',
            field=models.CharField(default='c50c32b56447462ea72f31ce0cefa491', max_length=100, primary_key=True, serialize=False, unique=True),
        ),
    ]
