KODULAR BLOCKS - Resume Maker  [v12]   (sirf 2 events, koi global variable nahi)

Designer: Web_Viewer1, File1, Sharing1   (baaki components hata sakte ho)
File1 -> Scope = App

when Web_Viewer1.WebViewStringChange (value)
do  set File1.Scope to App
    call File1.SaveFile( text = get value , fileName = "cv.pdf" )

when File1.AfterFileSaved (fileName)
do  call Sharing1.ShareFile( file = replace all( text = get fileName , segment = "file://" , replacement = "" ) )

Note: ShareFile mein koi fixed "/storage/emulated/0/Android/data/..." path mat daalo - woh file save hone se pehle hi share karne ki koshish karta hai
(Error 2001 "The File ... not found" isi se aata tha).

Back button (optional):
when Screen1.BackPressed
do  if Web_Viewer1.CanGoBack then call Web_Viewer1.GoBack else close application
