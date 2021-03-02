# Generated by Django 3.1.6 on 2021-03-02 04:15

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0028_auto_20210302_0259'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='author',
            name='id',
        ),
        migrations.AddField(
            model_name='author',
            name='author_id',
            field=models.CharField(default=uuid.uuid4, max_length=100, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='author',
            name='token',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='comment',
            name='id',
            field=models.CharField(default='d58844f4765a4e64a412f6490f25b8b0', editable=False, max_length=100, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='like',
            name='id',
            field=models.CharField(default='2efde8ec16434e288ed238252c3923e6', editable=False, max_length=100, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='id',
            field=models.CharField(default='efcd7b012320433a8b230b7fc039e563', max_length=100, primary_key=True, serialize=False, unique=True),
        ),
    ]
