---
author: Cem Karakurt
pubDatetime: 2024-10-20T08:00:00Z
modDatetime: 2024-10-20T08:00:00Z
title: WordPress Theme Development Cheat Sheet
slug: wordpress-cheat-sheet
featured: false
draft: false
tags:
  - wordpress
description: A cheat sheet for WordPress theme development.
---

WordPress version :

```php
<?php bloginfo('version'); ?>
```

Atom URL :

```php
<?php bloginfo('atom_url'); ?>
```

RSS URL :

```php
<?php bloginfo('rss2_url'); ?>
```

Charset :

```php
<?php bloginfo('charset'); ?>
```

Blog Name :

```php
<?php bloginfo('name'); ?>
```

Blog Description :

```php
<?php bloginfo('description'); ?>
```

Blog URL :

```php
<?php bloginfo('url'); ?>
```

Stylesheet URL :

```php
<?php bloginfo('stylesheet_url'); ?>
```

Template Path :

```php
<?php bloginfo('template_url'); ?>
```

include header.php :

```php
<?php get_header(''); ?>
```

include sidebar.php :

```php
<?php get_sidebar(''); ?>
```

include footer.php :

```php
<?php get_footer(''); ?>
```

List categories :

```php
<?php wp_list_cats('title_li='); ?>
```

List pages :

```php
<?php wp_list_pages('title_li='); ?>
```

Display calendar :

```php
<?php get_calendar(''); ?>
```

List Archives :

```php
<?php wp_get_archives('') ?>
```

Post title :

```php
<?php the_title(''); ?>
```

Post permalink :

```php
<?php the_permalink('') ?>
```

Post category :

```php
<?php the_category(', ') ?>
```

Post publish date :

```php
<?php the_time('j F Y'); ?>
```

Post content :

```php
<?php the_content(''); ?>
```

Post publish time :

```php
<?php the_time('H:i:s'); ?>
```

Comment count for post :

```php
<?php comments_popup_link(__('0 comment'), __('1 comment'), __('% comments'), '', __('Comments disabled.')); ?>
```

Post view count (required WP-PostViews plugin) :

```php
<?php if(function_exists('the_views')) { the_views(); } ?>
```

Post ID :

```php
<?php the_ID(); ?>
```

Post edit link :

```php
<?php edit_post_link(); ?>
```

Comment template (Comments.php) :

```php
<?php comments_template(); ?>
```

Author name :

```php
<?php the_author(''); ?>
```

About author :

```php
<?php the_author_description(''); ?>
```

Author first name :

```php
<?php the_author_firstname(''); ?>
```

Author last name :

```php
<?php the_author_lastname(''); ?>
```

Post count of author :

```php
<?php the_author_posts('');?>
```

Author page :

```php
<?php the_author_link('');?>
```

Author’s web site :

```php
<?php the_author_url(''); ?>
```

Author’e email address :

```php
<?php the_author_email('');?>
```

Next post link :

```php
<?php next_post_link('') ?>
```

Previous post link :

```php
<?php previous_post_link('') ?>
```

Pagination (pagenavi plugin required) ;

```php
<?php wp_pagenavi(); ?>
```
