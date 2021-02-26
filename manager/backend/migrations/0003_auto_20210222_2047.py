# Generated by Django 3.1.6 on 2021-02-23 03:47

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend', '0002_auto_20210203_2045'),
    ]

    operations = [
        migrations.CreateModel(
            name='Author',
            fields=[
                ('author_id', models.UUIDField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('display_name', models.CharField(max_length=100, unique=True)),
                ('github_url', models.URLField()),
                ('host', models.URLField()),
                ('url', models.URLField()),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('comment_id', models.UUIDField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('comment', models.CharField(max_length=500, null=True)),
                ('published', models.DateTimeField(auto_now_add=True)),
                ('content_type', models.CharField(max_length=50)),
                ('author_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.author')),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('like_id', models.UUIDField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('summary', models.CharField(default='Someone Likes your post', max_length=100)),
                ('author_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.author')),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('post_id', models.UUIDField(editable=False, primary_key=True, serialize=False, unique=True)),
                ('title', models.CharField(max_length=100)),
                ('source', models.URLField()),
                ('origin', models.URLField()),
                ('description', models.CharField(max_length=100)),
                ('content_type', models.CharField(max_length=50)),
                ('content', models.CharField(max_length=500, null=True)),
                ('categories', models.JSONField()),
                ('count', models.PositiveIntegerField()),
                ('published', models.DateTimeField(auto_now_add=True)),
                ('visibility', models.CharField(max_length=20)),
                ('unlisted', models.BooleanField(default=False)),
                ('author_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.author')),
            ],
        ),
        migrations.DeleteModel(
            name='Lead',
        ),
        migrations.AddField(
            model_name='like',
            name='post_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.post'),
        ),
        migrations.AddField(
            model_name='comment',
            name='post_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='backend.post'),
        ),
    ]