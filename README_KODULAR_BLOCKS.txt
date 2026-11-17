KODULAR BLOCKS - Resume Maker  [v10]

Teen buttons:
  Share PDF       -> app ke andar cv.pdf banti hai, phone ki native Share sheet khulti hai   (message: pdf|share|cv.pdf|<pdf text>)
  Download / Save -> Chrome khulta hai, cv.pdf Downloads mein download hoti hai               (message: open<link>)
  Print           -> Chrome khulta hai, Print / Save as PDF dialog khulta hai                  (message: open<link>)

Designer: Web_Viewer1, File1 (Scope = App), Sharing1, Activity_Starter1 (Action = android.intent.action.VIEW, DataUri khali)
(KIO4_Base641 aur Switch1 hata sakte ho - zaroorat nahi)

Blocks:

initialize global b64 to ""

when File1.AfterFileSaved (fileName)
do  Sharing1.ShareFile( file = join( "/storage/emulated/0/Android/data/<PACKAGE NAME>/files/" ,
                                     replace all( fileName , "file://" , "" ) ) )
    (agar fileName pehle se "/storage/..." ho to sirf replace all wala hissa use karo)

when Web_Viewer1.WebViewStringChange (value)
do  if starts at( value , "pdf|" ) = 1
    then set global b64 to select list item( split( value , "|" ) , 4 )
         set File1.Scope to App
         call File1.SaveFile( text = global b64 , fileName = "cv.pdf" )
    else if contains( value , "open" )
    then set Activity_Starter1.DataUri to replace all( value , "open" , "" )
         call Activity_Starter1.StartActivity
    else call Sharing1.ShareMessage( replace all( value , "share" , "" ) )

(global mode aur uska if/else hata do - ab zaroorat nahi.)

Back button (optional):
when Screen1.BackPressed
do  if Web_Viewer1.CanGoBack then call Web_Viewer1.GoBack else close application
