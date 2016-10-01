# cURL commands

Get current source
```sh
$ curl -H 'Host:192.168.0.9' -H 'Content-Type:text/xml; charset="utf-8"' -H 'Connection:keep-alive' -H 'Proxy-Connection:keep-alive' -H 'Accept:*/*' -H 'User-Agent:De2014SysHiFi/1668 CFNetwork/808.0.2 Darwin/16.0.0' -H 'Accept-Language:sv-se' -H 'Accept-Encoding:gzip, deflate' -X POST 'http://192.168.0.9/goform/AppCommand.xml' --data-binary '<?xml version="1.0" encoding="utf-8"?>
<tx>
  <cmd id="1">GetSourceStatus</cmd>
</tx>
'

# Response:
# <?xml version="1.0" encoding="utf-8" ?>
# <rx>
#   <cmd>
#     <source>BLUETOOTH</source>
#   </cmd>
# </rx>
```

Get current volume limit
```sh
$ curl -H 'Host:192.168.0.9' -H 'Content-Type:text/xml; charset="utf-8"' -H 'Connection:keep-alive' -H 'Proxy-Connection:keep-alive' -H 'Accept:*/*' -H 'User-Agent:De2014SysHiFi/1668 CFNetwork/808.0.2 Darwin/16.0.0' -H 'Accept-Language:sv-se' -H 'Accept-Encoding:gzip, deflate' -X POST 'http://192.168.0.9/goform/AppCommand0300.xml' --data-binary '<?xml version="1.0" encoding="utf-8"?>
<tx>
  <cmd id="3">
    <name>GetVolumeLimit</name>
    <list>
      <param name="type"></param>
      <param name="value"></param>
    </list>
  </cmd>
</tx>
'

# Response:
# <?xml version="1.0" encoding="utf-8" ?>
# <rx>
#   <cmd>
#     <name>GetVolumeLimit</name>
#     <list>
#       <param name="type" control="0">1</param>
#       <param name="value" control="2">45</param>
#     </list>
#   </cmd>
# </rx>
```

Get current volume
```sh
$ curl -H 'Host:192.168.0.9' -H 'Content-Type:text/xml; charset="utf-8"' -H 'Connection:keep-alive' -H 'Proxy-Connection:keep-alive' -H 'Accept:*/*' -H 'User-Agent:De2014SysHiFi/1668 CFNetwork/808.0.2 Darwin/16.0.0' -H 'Accept-Language:sv-se' -H 'Accept-Encoding:gzip, deflate' -X POST 'http://192.168.0.9/goform/AppCommand.xml' --data-binary '<?xml version="1.0" encoding="utf-8"?>
<tx>
  <cmd id="1">GetVolumeLevel</cmd>
</tx>
'

# Response:
# <?xml version="1.0" encoding="utf-8" ?>
# <rx>
#   <cmd>
#     <volume>-70.0</volume>
#     <disptype>ABSOLUTE</disptype>
#     <dispvalue>10</dispvalue>
#   </cmd>
# </rx>
```

Get power status
```sh
$ curl -H 'Host:192.168.0.9' -H 'Content-Type:text/xml; charset="utf-8"' -H 'Connection:keep-alive' -H 'Proxy-Connection:keep-alive' -H 'Accept:*/*' -H 'User-Agent:De2014SysHiFi/1668 CFNetwork/808.0.2 Darwin/16.0.0' -H 'Accept-Language:sv-se' -H 'Accept-Encoding:gzip, deflate' -X POST 'http://192.168.0.9/goform/AppCommand.xml' --data-binary '<?xml version="1.0" encoding="utf-8"?>
<tx>
  <cmd id="1">GetPowerStatus</cmd>
</tx>
'

# Response:
# <?xml version="1.0" encoding="utf-8" ?>
# <rx>
#   <cmd>
#     <power>STANDBY</power> // or ON
#   </cmd>
# </rx>
```

Get mute status
```sh
$ curl -H 'Host:192.168.0.9' -H 'Content-Type:text/xml; charset="utf-8"' -H 'Connection:keep-alive' -H 'Proxy-Connection:keep-alive' -H 'Accept:*/*' -H 'User-Agent:De2014SysHiFi/1668 CFNetwork/808.0.2 Darwin/16.0.0' -H 'Accept-Language:sv-se' -H 'Accept-Encoding:gzip, deflate' -X POST 'http://192.168.0.9/goform/AppCommand.xml' --data-binary '<?xml version="1.0" encoding="utf-8"?>
<tx>
  <cmd id="1">GetMuteStatus</cmd>
</tx>
'

# Response:
# <?xml version="1.0" encoding="utf-8" ?>
# <rx>
#   <cmd>
#     <mute>off</mute>
#   </cmd>
# </rx>
```

Get sources
```sh
$ curl -H 'Host:192.168.0.9' -H 'Content-Type:text/xml; charset="utf-8"' -H 'Connection:keep-alive' -H 'Proxy-Connection:keep-alive' -H 'Accept:*/*' -H 'User-Agent:De2014SysHiFi/1668 CFNetwork/808.0.2 Darwin/16.0.0' -H 'Accept-Language:sv-se' -H 'Accept-Encoding:gzip, deflate' -H 'Content-Length:106' -X POST 'http://192.168.0.9/goform/AppCommand.xml' --data-binary '<?xml version="1.0" encoding="utf-8"?>
<tx>
  <cmd id="1">GetDeletedSource</cmd>
  <value>1</value>
</tx>
'
# <?xml version="1.0" encoding="utf-8" ?>
# <rx>
#   <cmd>
#     <functiondelete>
#         <list>
#           <name>Favorites</name>
#           <FuncName>Favorites</FuncName>
#           <use>1</use>
#       </list>
#       <list>
#         <name>Internet Radio</name>
#         <FuncName>Internet Radio</FuncName>
#         <use>1</use>
#       </list>
#       <list>
#         <name>Music Server</name>
#         <FuncName>Music Server</FuncName>
#         <use>1</use>
#       </list>
#       <list>
#         <name>Bluetooth</name>
#         <FuncName>BLUETOOTH</FuncName>
#         <use>1</use>
#       </list>
#       <list>
#         <name>Pandora</name>
#         <FuncName>Pandora</FuncName>
#         <use>1</use>
#       </list>
#       <list>
#         <name>SiriusXM</name>
#         <FuncName>SiriusXM</FuncName>
#         <use>1</use>
#       </list>
#       <list>
#         <name>Spotify</name>
#         <FuncName>SpotifyConnect</FuncName>
#         <use>1</use>
#       </list>
#       <list>
#         <name>QPlay</name>
#         <FuncName>QPlay</FuncName>
#         <use>1</use>
#       </list>
#       <list>
#         <name>iPod/USB</name>
#         <FuncName>USB</FuncName>
#         <use>1</use>
#       </list>
#       <list>
#         <name>AUX:Digital In</name>
#         <FuncName>DIGITALIN1</FuncName>
#         <use>1</use>
#       </list>
#       <list>
#         <name>AUX:Analog In</name>
#         <FuncName>ANALOGIN</FuncName>
#         <use>1</use>
#       </list>
#     </functiondelete>
#   </cmd>
# </rx>
```

Get net audio status
```sh
$ curl -H 'Host:192.168.0.9' -H 'Content-Type:text/xml; charset="utf-8"' -H 'Connection:keep-alive' -H 'Proxy-Connection:keep-alive' -H 'Accept:*/*' -H 'User-Agent:De2014SysHiFi/1668 CFNetwork/808.0.2 Darwin/16.0.0' -H 'Accept-Language:sv-se' -H 'Accept-Encoding:gzip, deflate' -H 'Content-Length:88' -X POST 'http://192.168.0.9/goform/AppCommand.xml' --data-binary '<?xml version="1.0" encoding="utf-8"?>
<tx>
  <cmd id="1">GetNetAudioStatus</cmd>
</tx>
'

# Response:
# <?xml version="1.0" encoding="utf-8" ?>
# <rx>
#   <cmd>
#     <type>browse</type>
#     <text id="scridValue">102.1</text>
#     <text id="scrid">Internet Radio.1</text>
#     <text id="sourceicon">26</text>
#     <text id="title">Internet Radio</text>
#     <text id="line0" flag="ds">Sverige</text>
#     <text id="line1" flag="d">Sök Stationer</text>
#     <text id="line2" flag="d">Sök Podcasts</text>
#     <text id="line3" flag="d">Rekommenderade stationer</text>
#     <text id="line4" flag="d">radiodenon.com</text>
#     <text id="line5" flag="dF">Nyligen spelade</text>
#     <text id="line6" flag="dq">Sök med sökord</text>
#     <playstatus>Stop</playstatus>
#     <playcontents></playcontents>
#     <listmax>7</listmax>
#     <listposition>1</listposition>
#     <repeat>OFF</repeat>
#     <shuffle>OFF</shuffle>
#   </cmd>
# </rx>
#
# Alternative:
# <?xml version="1.0" encoding="utf-8" ?>
# <rx>
#   <cmd>
#     <type>play</type>
#     <text id="scridValue">100</text>
#     <text id="scrid">Internet Radio</text>
#     <text id="sourceicon">26</text>
#     <text id="title">Now Playing</text>
#     <text id="track">Ligga med P3</text>
#     <text id="artist">Sveriges Radio - P3 Live</text>
#     <text id="album"></text>
#     <text id="albart">yes</text>
#     <playstatus>Play</playstatus>
#     <playcontents>Internet Radio</playcontents>
#     <text id="format">MP3</text>
#     <text id="bitrate">192kbps</text>
#     <repeat>OFF</repeat>
#     <shuffle>OFF</shuffle>
#   </cmd>
# </rx>
```

Get encrypted token
```sh
$ curl -H 'Host:denon.vtuner.com' -H 'Proxy-Connection:keep-alive' -H 'Accept:*/*' -H 'User-Agent:De2014SysHiFi/1668 CFNetwork/808.0.2 Darwin/16.0.0' -H 'Accept-Language:sv-se' -H 'Accept-Encoding:gzip, deflate' -H 'Connection:keep-alive' 'http://denon.vtuner.com/setupapp/denon/asp/browsexm2/loginXML.asp?token=0&startitems=1&enditems=20'

# Response:
# <EncryptedToken>2921e4fd877d92a6</EncryptedToken>
```


Get radio stations
```sh
$ curl -H 'Host:denon.vtuner.com' -H 'Accept:*/*' -H 'Proxy-Connection:keep-alive' -H 'Cookie:ASPSESSIONIDSQQACBRQ=JJFHKPEBNHCMHBOFJLAGKBBA' -H 'User-Agent:De2014SysHiFi/1668 CFNetwork/808.0.2 Darwin/16.0.0' -H 'Accept-Language:sv-se' -H 'Accept-Encoding:gzip, deflate' -H 'Connection:keep-alive' 'http://denon.vtuner.com/setupapp/denon/asp/browsexm2/loginXML.asp?mac=363489e2240ca95c6c2a5e3fb29cb91d&dlang=swe&fver=1.754333&startitems=1&enditems=20'

# Response
# <?xml version="1.0" encoding="UTF-8" standalone="yes" ?>
# <ListOfItems>
#   <ItemCount>-1</ItemCount>
#   <Item>
#     <ItemType>Dir</ItemType>
#     <Title>Sverige</Title>
#     <UrlDir>http://denon.vtuner.com/setupapp/denon/asp/browsexm2/navXML.asp?gofile=LocationLevelFour-Europe-Sweden&amp;bkLvl=LocationLevelFour-Europe-SwedenOObkLvlTypeOOl</UrlDir>
#     <UrlDirBackUp>http://denon2.vtuner.com/setupapp/denon/asp/browsexm2/navXML.asp?gofile=LocationLevelFour-Europe-Sweden&amp;bkLvl=LocationLevelFour-Europe-SwedenOObkLvlTypeOOl</UrlDirBackUp>
#   </Item>
#   <Item>
#     <ItemType>Dir</ItemType>
#     <Title>Sök Stationer</Title>
#     <UrlDir>http://denon.vtuner.com/setupapp/denon/asp/browsexm2/navXML.asp?rLev=&amp;gofile=Search</UrlDir>
#     <UrlDirBackUp>http://denon2.vtuner.com/setupapp/denon/asp/browsexm2/navXML.asp?rLev=&amp;gofile=Search</UrlDirBackUp>
#   </Item>
#   <Item>
#     <ItemType>Dir</ItemType>
#     <Title>Sök Podcasts</Title>
#     <UrlDir>http://denon.vtuner.com/setupapp/denon/asp/browsexm2/navXML.asp?rLev=&amp;gofile=Searchp</UrlDir>
#     <UrlDirBackUp>http://denon2.vtuner.com/setupapp/denon/asp/browsexm2/navXML.asp?rLev=&amp;gofile=Searchp</UrlDirBackUp>
#   </Item>
#   <Item>
#   <ItemType>Dir</ItemType>
#     <Title>Rekommenderade stationer</Title>
#     <UrlDir>http://denon.vtuner.com/setupapp/denon/asp/browsexm2/navXML.asp?rLev=&amp;gofile=Pick</UrlDir>
#     <UrlDirBackUp>http://denon2.vtuner.com/setupapp/denon/asp/browsexm2/navXML.asp?rLev=&amp;gofile=Pick</UrlDirBackUp>
#   </Item>
#   <Item>
#     <ItemType>Dir</ItemType>
#     <Title>radiodenon.com</Title>
#     <UrlDir>http://denon.vtuner.com/setupapp/denon/asp/browsexm2/navXML.asp?rLev=&amp;gofile=web</UrlDir>
#     <UrlDirBackUp>http://denon2.vtuner.com/setupapp/denon/asp/browsexm2/navXML.asp?rLev=&amp;gofile=web</UrlDirBackUp>
#   </Item>
# </ListOfItems>
```sh


Get favorites
```sh
$ curl -H 'Host:192.168.0.9' -H 'Content-Type:text/xml; charset="utf-8"' -H 'Connection:keep-alive' -H 'Proxy-Connection:keep-alive' -H 'Accept:*/*' -H 'User-Agent:De2014SysHiFi/1668 CFNetwork/808.0.2 Darwin/16.0.0' -H 'Accept-Language:sv-se' -H 'Accept-Encoding:gzip, deflate' -H 'Content-Length:92' -X POST 'http://192.168.0.9/goform/AppCommand.xml' --data-binary '<?xml version="1.0" encoding="utf-8"?>
<tx>
  <cmd id="1">GetSystemFavoriteList</cmd>
</tx>
'

# Response:
# <?xml version="1.0" encoding="utf-8" ?>
# <rx>
#   <cmd>
#     <list>
#       <favorite>
#         <No>01</No>
#         <FuncName>Internet Radio</FuncName>
#         <ItemName>Sveriges Radio -</ItemName>
#       </favorite>
#       <favorite>
#         <No>02</No>
#         <FuncName>Internet Radio</FuncName>
#         <ItemName>Sveriges Radio -</ItemName>
#       </favorite>
#       <favorite>
#         <No>03</No>
#         <FuncName>Internet Radio</FuncName>
#         <ItemName>Sveriges Radio -</ItemName>
#       </favorite>
#       <favorite>
#         <No>04</No>
#         <FuncName></FuncName>
#         <ItemName></ItemName>
#       </favorite>
#       <favorite>
#         <No>05</No>
#         <FuncName></FuncName>
#         <ItemName></ItemName>
#       </favorite>
#       ...
#     </list>
#   </cmd>
# </rx>
```sh


Get audio info
```sh
$ curl -H 'Host:192.168.0.9' -H 'Content-Type:text/xml; charset="utf-8"' -H 'Connection:keep-alive' -H 'Proxy-Connection:keep-alive' -H 'Accept:*/*' -H 'User-Agent:De2014SysHiFi/1668 CFNetwork/808.0.2 Darwin/16.0.0' -H 'Accept-Language:sv-se' -H 'Accept-Encoding:gzip, deflate' -H 'Content-Length:305' -X POST 'http://192.168.0.9/goform/AppCommand0300.xml' --data-binary '<?xml version="1.0" encoding="utf-8"?>
<tx>
  <cmd id="3">
    <name>GetAudioInfo</name>
    <list>
      <param name="inputmode"></param>
      <param name="output"></param>
      <param name="signal"></param>
      <param name="sound"></param>
      <param name="fs"></param>
    </list>
  </cmd>
</tx>
'

# Response:
# <?xml version="1.0" encoding="utf-8" ?>
# <rx>
#   <cmd>
#     <name>GetAudioInfo</name>
#     <list>
#       <param name="signal" control="1">MP3</param>
#       <param name="fs" control="1">192kbps</param>
#     </list>
#   </cmd>
# </rx>
```

curl -H 'Host:192.168.0.9' -H 'Content-Type:text/xml; charset="utf-8"' -H 'Connection:keep-alive' -H 'Proxy-Connection:keep-alive' -H 'Accept:*/*' -H 'User-Agent:De2014SysHiFi/1668 CFNetwork/808.0.2 Darwin/16.0.0' -H 'Accept-Language:sv-se' -H 'Accept-Encoding:gzip, deflate' -H 'Content-Length:200' -X POST 'http://192.168.0.9/goform/AppCommand0300.xml' --data-binary '<?xml version="1.0" encoding="utf-8"?>
<tx>
  <cmd id="3">
    <name>SetVolumeLevel</name>
    <list>
      <param name="type">1</param>
      <param name="value">2</param>
    </list>
  </cmd>
</tx>
'
