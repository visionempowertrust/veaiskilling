$ErrorActionPreference = 'Stop'
$powerPoint = New-Object -ComObject PowerPoint.Application
$powerPoint.Visible = [Microsoft.Office.Core.MsoTriState]::msoTrue
try {
  1..3 | ForEach-Object {
    $pptx = Join-Path $PSScriptRoot "..\public\assets\AI Skilling Module $_.pptx"
    $pdf = Join-Path $PSScriptRoot "..\public\assets\AI Skilling Module $_.pdf"
    $deck = $powerPoint.Presentations.Open((Resolve-Path $pptx), $true, $false, $false)
    $deck.SaveAs($pdf, 32)
    $deck.Close()
  }
} finally { $powerPoint.Quit() }
