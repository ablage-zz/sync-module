{
  "targets": [
    {
      "target_name": "sync",
      "sources": [ "sync.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")"
      ]
    }
  ]
}
