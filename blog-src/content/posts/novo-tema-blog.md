+++
date = '2025-10-11T20:27:16-03:00'
title = 'Novo tema'
tags = ['blog', 'hugo']
+++

Fiz algumas melhorias na navegabilidade do blog e refiz o layout dele...

Hugo é um gerador de sites bem interessante! Dá para programar algumas coisas bem básicas nele.

Uma das ideias que tive era mostrar as tags de um post como se fossem etiquetinhas, e a cor delas seria determinada indexando-se uma lista com o hash computado da tag.

O _partial_ ficou mais ou menos assim:

<!--more-->

```go
{{ $classes := slice
  "tag-red" "tag-blue" "tag-green" "tag-purple"
  "tag-orange" "tag-yellow" "tag-pink" "tag-brown"
}}

{{ $name := lower . | trim " " }}
{{ $hash := sha1 $name | lower }}
{{ $hex := substr $hash 0 8 }}

{{ $hexMap := dict
  "0" 0  "1" 1  "2" 2  "3" 3  "4" 4  "5" 5  "6" 6  "7" 7
  "8" 8  "9" 9  "a" 10 "b" 11 "c" 12 "d" 13 "e" 14 "f" 15
}}

{{ $val := 0 }}
{{ range split $hex "" }}
  {{ $digit := index $hexMap . }}
  {{ $val = add (mul $val 16) $digit }}
{{ end }}

{{ $index := mod $val (len $classes) }}
{{ index $classes $index }}
```

Mas no fim, depois de um pouco de dor de cabeça tentando usar o `clip-path`, eu acabei não gostando de como a ideia ficou e decidi deletar tudo. Enfim...