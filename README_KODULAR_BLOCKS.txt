KODULAR BLOCKS - Resume Maker  [v11]

Ab sirf EK button hai: Share (Print aur PDF buttons hata diye).
  Share -> app ke andar cv.pdf banti hai, phone ki native Share sheet khulti hai (WhatsApp etc.)
           (message: pdf|share|cv.pdf|<pdf text>)

Designer: Web_Viewer1, File1 (Scope = App), Sharing1
(Activity_Starter1, KIO4_Base641, Notifier1 hata sakte ho - zaroorat nahi)

Blocks (SIRF yehi rakho - purane "global mode" aur "else" wale blocks hata do):

initialize global b64 to ""

when File1.AfterFileSaved (fileName)
do  call Sharing1.ShareFile( file = replace all( fileName , "file://" , "" ) )
    (agar share sheet khali/error aaye to: join( "/storage/emulated/0/Android/data/<PACKAGE NAME>/files/" , replace all( fileName , "file://" , "" ) ))

when Web_Viewer1.WebViewStringChange (value)
do  if starts at( value , "pdf|" ) = 1
    then set global b64 to select list item( split( value , "|" ) , index = 4 )     <-- 4 (purane block mein 1 aur 2 tha = galat)
         set File1.Scope to App
         call File1.SaveFile( text = global b64 , fileName = "cv.pdf" )

Back button (optional):
when Screen1.BackPressed
do  if Web_Viewer1.CanGoBack then call Web_Viewer1.GoBack else close application
